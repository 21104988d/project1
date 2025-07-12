import { createClient, RedisClientType } from 'redis';

export interface USDTPrice {
  chain: string;
  price: string;
  timestamp: string;
  source: string;
  confidence: number;
}

export interface USDTRates {
  [chain: string]: {
    price: string;
    change24h: string;
    volume24h: string;
    lastUpdated: string;
    sources: string[];
  };
}

export class USDTPriceFeedService {
  private redisClient: RedisClientType;
  private readonly priceFeeds = new Map<string, string>([
    ['ethereum', 'chainlink'],
    ['arbitrum', 'chainlink'],
    ['polygon', 'chainlink'],
    ['bsc', 'pancakeswap'],
    ['solana', 'pyth'],
  ]);

  private readonly fallbackPrices = new Map<string, string>([
    ['ethereum', '1.0001'],
    ['arbitrum', '0.9999'],
    ['polygon', '1.0002'],
    ['bsc', '0.9998'],
    ['solana', '1.0000'],
  ]);

  constructor() {
    this.initializeRedis();
  }

  private async initializeRedis() {
    try {
      this.redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });

      this.redisClient.on('error', err => {
        console.error('Redis Client Error:', err);
      });

      await this.redisClient.connect();
      console.log('✅ USDT Price Feed Service connected to Redis');
    } catch (error) {
      console.error('❌ Failed to connect to Redis:', error);
      // Continue without Redis for development
    }
  }

  async getUSDTPrices(chains: string[]): Promise<USDTPrice[]> {
    const prices: USDTPrice[] = [];

    for (const chain of chains) {
      try {
        // Try to get from cache first
        const cachedPrice = await this.getCachedPrice(chain);
        if (cachedPrice) {
          prices.push(cachedPrice);
          continue;
        }

        // Fetch fresh price
        const price = await this.fetchUSDTPrice(chain);
        prices.push(price);

        // Cache the result
        await this.cachePrice(chain, price);
      } catch (error) {
        console.error(`Error fetching USDT price for ${chain}:`, error);

        // Use fallback price
        const fallbackPrice = this.fallbackPrices.get(chain) || '1.0000';
        prices.push({
          chain,
          price: fallbackPrice,
          timestamp: new Date().toISOString(),
          source: 'fallback',
          confidence: 0.8,
        });
      }
    }

    return prices;
  }

  async getAllUSDTRates(): Promise<USDTRates> {
    const chains = ['ethereum', 'arbitrum', 'polygon', 'bsc', 'solana'];
    const rates: USDTRates = {};

    for (const chain of chains) {
      try {
        const price = await this.fetchUSDTPrice(chain);
        const historical = await this.getHistoricalData(chain);

        rates[chain] = {
          price: price.price,
          change24h: this.calculateChange24h(historical),
          volume24h: await this.getVolume24h(chain),
          lastUpdated: price.timestamp,
          sources: [price.source],
        };
      } catch (error) {
        console.error(`Error getting rates for ${chain}:`, error);

        // Fallback data
        rates[chain] = {
          price: this.fallbackPrices.get(chain) || '1.0000',
          change24h: '0.00',
          volume24h: '0',
          lastUpdated: new Date().toISOString(),
          sources: ['fallback'],
        };
      }
    }

    return rates;
  }

  private async fetchUSDTPrice(chain: string): Promise<USDTPrice> {
    const source = this.priceFeeds.get(chain) || 'chainlink';

    // Simulate different price feed sources
    switch (source) {
      case 'chainlink':
        return this.fetchChainlinkPrice(chain);
      case 'pyth':
        return this.fetchPythPrice(chain);
      case 'pancakeswap':
        return this.fetchPancakeSwapPrice(chain);
      default:
        return this.fetchGenericPrice(chain);
    }
  }

  private async fetchChainlinkPrice(chain: string): Promise<USDTPrice> {
    // Simulate Chainlink price feed
    const basePrice = 1.0;
    const variation = (Math.random() - 0.5) * 0.001; // ±0.05%
    const price = (basePrice + variation).toFixed(6);

    return {
      chain,
      price,
      timestamp: new Date().toISOString(),
      source: 'chainlink',
      confidence: 0.99,
    };
  }

  private async fetchPythPrice(chain: string): Promise<USDTPrice> {
    // Simulate Pyth Network price feed
    const basePrice = 1.0;
    const variation = (Math.random() - 0.5) * 0.0008; // ±0.04%
    const price = (basePrice + variation).toFixed(6);

    return {
      chain,
      price,
      timestamp: new Date().toISOString(),
      source: 'pyth',
      confidence: 0.98,
    };
  }

  private async fetchPancakeSwapPrice(chain: string): Promise<USDTPrice> {
    // Simulate PancakeSwap price feed
    const basePrice = 0.9999;
    const variation = (Math.random() - 0.5) * 0.002; // ±0.1%
    const price = (basePrice + variation).toFixed(6);

    return {
      chain,
      price,
      timestamp: new Date().toISOString(),
      source: 'pancakeswap',
      confidence: 0.95,
    };
  }

  private async fetchGenericPrice(chain: string): Promise<USDTPrice> {
    // Generic fallback price feed
    const basePrice = 1.0;
    const variation = (Math.random() - 0.5) * 0.001;
    const price = (basePrice + variation).toFixed(6);

    return {
      chain,
      price,
      timestamp: new Date().toISOString(),
      source: 'generic',
      confidence: 0.9,
    };
  }

  private async getCachedPrice(chain: string): Promise<USDTPrice | null> {
    if (!this.redisClient) return null;

    try {
      const cached = await this.redisClient.get(`usdt_price:${chain}`);
      if (cached) {
        const price: USDTPrice = JSON.parse(cached);

        // Check if price is still fresh (within 10 seconds)
        const age = Date.now() - new Date(price.timestamp).getTime();
        if (age < 10000) {
          return price;
        }
      }
    } catch (error) {
      console.error('Error getting cached price:', error);
    }

    return null;
  }

  private async cachePrice(chain: string, price: USDTPrice): Promise<void> {
    if (!this.redisClient) return;

    try {
      await this.redisClient.setEx(
        `usdt_price:${chain}`,
        15, // 15 seconds TTL
        JSON.stringify(price)
      );
    } catch (error) {
      console.error('Error caching price:', error);
    }
  }

  private async getHistoricalData(_chain: string): Promise<number[]> {
    // Simulate 24h of hourly price data
    const prices: number[] = [];
    let basePrice = 1.0;

    for (let i = 0; i < 24; i++) {
      const variation = (Math.random() - 0.5) * 0.001;
      basePrice += variation;
      prices.push(basePrice);
    }

    return prices;
  }

  private calculateChange24h(historical: number[]): string {
    if (historical.length < 2) return '0.00';

    const currentPrice = historical[historical.length - 1];
    const price24hAgo = historical[0];
    const change = ((currentPrice - price24hAgo) / price24hAgo) * 100;

    return change.toFixed(4);
  }

  private async getVolume24h(chain: string): Promise<string> {
    // Simulate 24h volume data
    const baseVolumes: Record<string, number> = {
      ethereum: 45000000,
      arbitrum: 12000000,
      polygon: 8500000,
      bsc: 6200000,
      solana: 3800000,
    };

    const baseVolume = baseVolumes[chain] || 1000000;
    const variation = 0.8 + Math.random() * 0.4; // 0.8-1.2x
    const volume = Math.round(baseVolume * variation);

    return volume.toString();
  }

  // Real-time price streaming for WebSocket
  async startPriceStreaming(callback: (price: USDTPrice) => void): Promise<void> {
    const chains = ['ethereum', 'arbitrum', 'polygon', 'bsc', 'solana'];

    // Update prices every 5 seconds
    setInterval(async () => {
      for (const chain of chains) {
        try {
          const price = await this.fetchUSDTPrice(chain);
          await this.cachePrice(chain, price);
          callback(price);
        } catch (error) {
          console.error(`Error in price streaming for ${chain}:`, error);
        }
      }
    }, 5000);
  }

  // Price alerts for significant changes
  async checkPriceAlerts(): Promise<void> {
    const chains = ['ethereum', 'arbitrum', 'polygon', 'bsc', 'solana'];

    for (const chain of chains) {
      try {
        const currentPrice = await this.fetchUSDTPrice(chain);
        const cachedPrice = await this.getCachedPrice(chain);

        if (cachedPrice) {
          const priceDiff = Math.abs(
            parseFloat(currentPrice.price) - parseFloat(cachedPrice.price)
          );

          // Alert if price changed more than 0.1%
          if (priceDiff > 0.001) {
            console.warn(
              `⚠️ USDT price alert for ${chain}: ${cachedPrice.price} → ${currentPrice.price}`
            );
          }
        }
      } catch (error) {
        console.error(`Error checking price alerts for ${chain}:`, error);
      }
    }
  }

  async cleanup(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }

  async getFastQuote(
    fromToken: string,
    toToken: string,
    amount: string,
    fromChain: string,
    toChain: string
  ): Promise<any> {
    try {
      // Get cached prices for fast response
      const fromPrice = (await this.getCachedPrice(fromChain)) || {
        chain: fromChain,
        price: '1.0000',
        timestamp: new Date().toISOString(),
        source: 'cache',
        confidence: 0.9,
      };

      const toPrice = (await this.getCachedPrice(toChain)) || {
        chain: toChain,
        price: '1.0000',
        timestamp: new Date().toISOString(),
        source: 'cache',
        confidence: 0.9,
      };

      // Simple calculation for fast quote
      const amountNum = parseFloat(amount);
      const rate = parseFloat(fromPrice.price) / parseFloat(toPrice.price);
      const estimatedOutput = (amountNum * rate * 0.997).toString(); // 0.3% fee

      return {
        fromToken,
        toToken,
        fromChain,
        toChain,
        inputAmount: amount,
        outputAmount: estimatedOutput,
        rate: rate.toString(),
        priceImpact: '0.05',
        fee: '0.3',
        gasEstimate: '150000',
        estimatedTime: '30',
        confidence: Math.min(fromPrice.confidence, toPrice.confidence),
        cached: true,
      };
    } catch (error) {
      console.error('Fast quote error:', error);
      throw error;
    }
  }

  async getCurrentPrice(pair: string, chain: string): Promise<any> {
    try {
      // Parse pair (e.g., "USDT/USDC")
      const [_baseToken, _quoteToken] = pair.split('/');
      // TODO: Use _baseToken and _quoteToken for specific pair pricing

      // Get current price from cache or fetch fresh
      let cachedPrice = await this.getCachedPrice(chain);

      if (!cachedPrice || Date.now() - new Date(cachedPrice.timestamp).getTime() > 5000) {
        // Refresh if older than 5 seconds
        cachedPrice = await this.fetchUSDTPrice(chain);
        await this.cachePrice(chain, cachedPrice);
      }

      // Simulate pair-specific data
      const basePrice = parseFloat(cachedPrice.price);
      const variation = 0.999 + Math.random() * 0.002; // Small variation for different pairs
      const pairPrice = basePrice * variation;

      return {
        price: pairPrice.toFixed(6),
        bid: (pairPrice * 0.9995).toFixed(6),
        ask: (pairPrice * 1.0005).toFixed(6),
        volume24h: await this.getVolume24h(chain),
        change24h: this.calculateChange24h([basePrice * 0.9999, basePrice]),
        lastUpdate: cachedPrice.timestamp,
        source: cachedPrice.source,
        confidence: cachedPrice.confidence,
      };
    } catch (error) {
      console.error('Get current price error:', error);
      throw error;
    }
  }
}
