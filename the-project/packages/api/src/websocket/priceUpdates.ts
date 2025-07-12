import { Server as SocketIOServer, Socket } from 'socket.io';
import { USDTPriceFeedService } from '../services/USDTPriceFeedService';

interface PriceSubscription {
  pair: string;
  chain: string;
  socketId: string;
}

class PriceUpdateHandler {
  private io: SocketIOServer;
  private subscriptions: Map<string, PriceSubscription[]> = new Map();
  private priceFeedService: USDTPriceFeedService;
  private updateInterval: NodeJS.Timeout | null = null;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.priceFeedService = new USDTPriceFeedService();
  }

  public setupHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Handle price subscription
      socket.on('subscribe_prices', (data: { pairs: string[]; chains: string[] }) => {
        this.handlePriceSubscription(socket, data);
      });

      // Handle unsubscribe
      socket.on('unsubscribe_prices', (data: { pairs: string[]; chains: string[] }) => {
        this.handlePriceUnsubscription(socket, data);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });

      // Send initial prices
      socket.emit('connection_established', {
        timestamp: Date.now(),
        server: 'USDT Price Feed Service',
      });
    });

    // Start price broadcasting
    this.startPriceBroadcasting();
  }

  private handlePriceSubscription(
    socket: Socket,
    data: { pairs: string[]; chains: string[] }
  ): void {
    try {
      const { pairs, chains } = data;

      for (const pair of pairs) {
        for (const chain of chains) {
          const key = `${pair}_${chain}`;

          if (!this.subscriptions.has(key)) {
            this.subscriptions.set(key, []);
          }

          const subscription: PriceSubscription = {
            pair,
            chain,
            socketId: socket.id,
          };

          this.subscriptions.get(key)!.push(subscription);
        }
      }

      socket.emit('subscription_confirmed', {
        pairs,
        chains,
        timestamp: Date.now(),
      });

      console.log(
        `Client ${socket.id} subscribed to ${pairs.length} pairs on ${chains.length} chains`
      );
    } catch (error) {
      console.error('Price subscription error:', error);
      socket.emit('subscription_error', {
        error: 'Failed to subscribe to price updates',
      });
    }
  }

  private handlePriceUnsubscription(
    socket: Socket,
    data: { pairs: string[]; chains: string[] }
  ): void {
    try {
      const { pairs, chains } = data;

      for (const pair of pairs) {
        for (const chain of chains) {
          const key = `${pair}_${chain}`;
          const subs = this.subscriptions.get(key);

          if (subs) {
            const filtered = subs.filter(sub => sub.socketId !== socket.id);
            if (filtered.length === 0) {
              this.subscriptions.delete(key);
            } else {
              this.subscriptions.set(key, filtered);
            }
          }
        }
      }

      socket.emit('unsubscription_confirmed', {
        pairs,
        chains,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Price unsubscription error:', error);
    }
  }

  private handleDisconnect(socket: Socket): void {
    // Remove all subscriptions for this socket
    for (const [key, subs] of this.subscriptions.entries()) {
      const filtered = subs.filter(sub => sub.socketId !== socket.id);
      if (filtered.length === 0) {
        this.subscriptions.delete(key);
      } else {
        this.subscriptions.set(key, filtered);
      }
    }

    console.log(`Client disconnected: ${socket.id}`);
  }

  private startPriceBroadcasting(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(async () => {
      await this.broadcastPriceUpdates();
    }, 1000); // Update every second

    console.log('Price broadcasting started');
  }

  private async broadcastPriceUpdates(): Promise<void> {
    try {
      const uniqueSubscriptions = new Set<string>();

      // Collect all unique pair-chain combinations
      for (const key of this.subscriptions.keys()) {
        uniqueSubscriptions.add(key);
      }

      // Fetch and broadcast prices for each unique subscription
      for (const key of uniqueSubscriptions) {
        const [pair, chain] = key.split('_');
        const subs = this.subscriptions.get(key);

        if (subs && subs.length > 0) {
          try {
            // Get current price data
            const priceData = await this.priceFeedService.getCurrentPrice(pair, chain);

            // Broadcast to all subscribers
            const socketIds = subs.map(sub => sub.socketId);
            for (const socketId of socketIds) {
              this.io.to(socketId).emit('price_update', {
                pair,
                chain,
                ...priceData,
                timestamp: Date.now(),
              });
            }
          } catch (error) {
            console.error(`Failed to fetch price for ${key}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Price broadcasting error:', error);
    }
  }

  public stopPriceBroadcasting(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    console.log('Price broadcasting stopped');
  }
}

export function setupWebSocketHandlers(io: SocketIOServer): void {
  const priceHandler = new PriceUpdateHandler(io);
  priceHandler.setupHandlers();
}

export { PriceUpdateHandler };
