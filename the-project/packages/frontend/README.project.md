# Frontend Package - Cross-Chain DApp Interface

**Package:** `@theproject/frontend`  
**Framework:** React 18 + TypeScript + Vite  
**Focus:** Stablecoin-first cross-chain swap interface

## Overview

The frontend package provides a modern React-based DApp interface for
cross-chain stablecoin swaps. This interface focuses on simplicity and user
experience, initially supporting USDT and USDC arbitrage opportunities across
multiple blockchains.

## Features

### Phase 1: Stablecoin Focus

- **USDT/USDC Cross-Chain Swaps:** Seamless swaps between USDT and USDC across
  supported chains
- **Real-Time Quotes:** Live pricing with slippage protection and gas estimation
- **Multi-Chain Wallet Integration:** Support for MetaMask, WalletConnect, and
  Solana wallets
- **Transaction Status Tracking:** Real-time status updates for cross-chain
  transactions
- **Arbitrage Opportunities:** Visual indicators for profitable arbitrage routes

### Supported Networks

- Ethereum Mainnet
- Arbitrum One
- Polygon
- BNB Smart Chain
- Avalanche
- Optimism
- Fantom
- Solana

### Supported Stablecoins

- **USDT (Tether USD):** Primary focus with highest liquidity
- **USDC (USD Coin):** Secondary focus with excellent regulatory compliance

## Architecture

```
src/
├── components/
│   ├── SwapInterface/     # Main swap widget
│   ├── QuoteDisplay/      # Price quotes and route visualization
│   ├── TransactionStatus/ # Transaction tracking
│   └── WalletConnect/     # Wallet connection management
├── hooks/
│   ├── useWallet.ts       # Wallet connection and state
│   ├── useSwap.ts         # Swap execution logic
│   ├── useQuotes.ts       # Real-time price quotes
│   └── useArbitrage.ts    # Arbitrage opportunity detection
├── services/
│   ├── api.ts             # Backend API integration
│   ├── websocket.ts       # Real-time price updates
│   └── blockchain.ts      # Blockchain interaction utilities
└── types/
    └── index.ts           # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

```bash
# From the frontend package directory
yarn install

# Or from the workspace root
yarn workspace @theproject/frontend install
```

### Development

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run tests
yarn test

# Lint code
yarn lint
```

### Environment Variables

Create a `.env` file in the package root:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001/ws

# Chain Configuration
VITE_DEFAULT_CHAIN_ID=1
VITE_SUPPORTED_CHAINS=1,42161,137,56,43114,10,250

# Wallet Configuration
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Feature Flags
VITE_ENABLE_ARBITRAGE=true
VITE_ENABLE_YIELD_FARMING=false
```

## Key Components

### SwapInterface

The main swap widget that handles:

- Token selection (USDT/USDC)
- Chain selection
- Amount input with validation
- Slippage tolerance settings
- Transaction execution

### QuoteDisplay

Real-time quote visualization featuring:

- Best route visualization
- Price impact calculation
- Gas cost estimation
- Alternative route options
- Arbitrage opportunity highlighting

### TransactionStatus

Transaction tracking component that provides:

- Real-time status updates
- Cross-chain confirmation tracking
- Error handling and retry mechanisms
- Transaction receipt details

## Integration with Backend

The frontend integrates with the backend API for:

- **Quote Requests:** Real-time price quotes from multiple DEXs
- **Route Optimization:** Optimal path finding for cross-chain swaps
- **Transaction Execution:** Secure transaction signing and broadcast
- **Status Updates:** WebSocket-based real-time updates

## Wallet Integration

### Supported Wallets

- **MetaMask:** Ethereum and EVM-compatible chains
- **WalletConnect:** Universal wallet connection
- **Phantom:** Solana wallet integration
- **Coinbase Wallet:** Additional EVM support

### Multi-Chain Support

The interface automatically switches between chains and prompts users to add new
networks to their wallets when needed.

## Security Features

- **Transaction Simulation:** Pre-execution validation
- **Slippage Protection:** Automatic slippage calculation and protection
- **MEV Protection:** Integration with MEV protection services
- **Input Validation:** Comprehensive client-side validation
- **Secure Communication:** All API calls use HTTPS/WSS

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow React functional component patterns
- Implement proper error boundaries
- Use custom hooks for business logic

### Testing

- Unit tests for utility functions
- Integration tests for components
- E2E tests for critical user flows

### Performance

- Code splitting for optimal bundle size
- Memoization for expensive calculations
- Virtual scrolling for large lists
- Progressive loading for better UX

## Deployment

The frontend is built as a static SPA and can be deployed to:

- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- IPFS for decentralized hosting

### Build Process

```bash
# Production build
yarn build

# The dist/ folder contains the deployable assets
```

## Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation
4. Submit PRs with clear descriptions

## License

MIT License - see the main project LICENSE file.
