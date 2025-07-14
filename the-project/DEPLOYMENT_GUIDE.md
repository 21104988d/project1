# 🚀 PayMe DApp Deployment Guide

## Quick Start Options

### 1. 🎯 **One-Button Deployment** (Recommended)
Complete full-stack deployment with one command:

```bash
cd the-project
./deploy-one-button.sh
```

**What it includes:**
- ✅ Docker infrastructure (PostgreSQL, Redis)
- ✅ Smart contract compilation & deployment to testnets
- ✅ Frontend and API servers
- ✅ Automatic service health checks
- ✅ Environment validation

### 2. 📋 **Department Review Setup**
For non-technical department reviews:

```bash
./scripts/setup-review.sh
```

**Features:**
- ✅ Simplified setup process
- ✅ Demo mode (no real crypto needed)
- ✅ Mobile-friendly interface
- ✅ Guided review checklist

### 3. 🛠️ **Developer Setup**
For full development environment:

```bash
./scripts/complete-setup.sh
```

## Available Commands

### Deployment
```bash
npm run review:deploy          # One-button deployment
npm run deploy:testnet:all     # Deploy to all testnets
npm run deploy:testnet:sepolia # Deploy to Sepolia only
npm run deploy:testnet:arbitrum # Deploy to Arbitrum Sepolia only
```

### Development
```bash
npm run dev                    # Start both API and frontend
npm run frontend:dev          # Frontend only
npm run api:dev              # API only
```

### Infrastructure
```bash
npm run docker:up             # Start Docker services
npm run docker:down           # Stop Docker services
npm run docker:logs           # View service logs
```

## Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Required variables:**
   - `INFURA_PROJECT_ID` - Get from [Infura](https://infura.io/)
   - `DEPLOYER_PRIVATE_KEY` - Testnet wallet private key
   - `ETHERSCAN_API_KEY` - Get from [Etherscan](https://etherscan.io/apis)

3. **Optional variables:**
   - `SENTRY_DSN` - Error monitoring
   - `GOOGLE_ANALYTICS_ID` - Analytics tracking

## Network Configuration (Updated 2025)

### ✅ Active Testnets
- **Sepolia** (Primary Ethereum testnet)
- **Arbitrum Sepolia** (L2 testnet)

### ❌ Deprecated Networks
- ~~Goerli~~ (Scheduled for shutdown)
- ~~Arbitrum Goerli~~ (Use Arbitrum Sepolia instead)

## Troubleshooting

### Common Issues

1. **Port 5173 already in use:**
   ```bash
   lsof -ti:5173 | xargs kill -9
   ```

2. **Docker services not starting:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

3. **Environment variables missing:**
   - Check `.env` file exists
   - Verify all required variables are set
   - Run deployment with `--verbose` flag for details

### Service URLs
- **Frontend:** http://localhost:5173
- **API:** http://localhost:3001
- **Database:** localhost:5432
- **Redis:** localhost:6379

## Review Checklist

### Visual Design ✅
- [ ] Professional appearance suitable for financial application
- [ ] Consistent branding throughout the interface
- [ ] Clear visual hierarchy and readable typography
- [ ] Appropriate use of colors and spacing

### User Experience ✅
- [ ] Intuitive navigation without training needed
- [ ] Clear call-to-action buttons and workflows
- [ ] Helpful error messages and guidance
- [ ] Fast and responsive interactions

### Mobile Experience ✅
- [ ] Works well on mobile devices (phone/tablet)
- [ ] Touch-friendly interface elements
- [ ] Readable text on small screens
- [ ] Fast loading on mobile connections

### Security & Trust ✅
- [ ] Professional appearance that builds confidence
- [ ] Clear transaction flows and confirmations
- [ ] Transparent fee structure and costs
- [ ] Secure wallet connection process

## Support

For issues or questions:
1. Check `review-docs/TROUBLESHOOTING.md`
2. Review deployment logs: `npm run docker:logs`
3. Restart services: `./deploy-one-button.sh`
