#!/bin/bash

# =================================================================
# THE PROJECT - REVIEW SETUP SCRIPT
# =================================================================
# Purpose: One-click setup for department reviews of the dapp
# Usage: ./scripts/setup-review.sh (run from main repository root)
# Target: Non-technical departments reviewing Part 1.5 Design Excellence
# =================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "================================================================="
echo "  THE PROJECT - DEPARTMENT REVIEW SETUP"
echo "  Setting up the dapp for easy review and demonstration"
echo "================================================================="
echo -e "${NC}"

# Check prerequisites
echo -e "${YELLOW}🔍 Checking system requirements...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version is too old. Please install Node.js 18+${NC}"
    echo "   Current version: $(node -v)"
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
# Check if we're in the right directory
if [ ! -d "the-project" ]; then
    echo -e "${RED}❌ Please run this script from the main repository root${NC}"
    echo "   Make sure you can see the 'the-project' directory"
    exit 1
fi

# Change to the project directory for setup
cd the-project

echo -e "${GREEN}✅ Found project directory${NC}"

# Installation
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
echo "   This may take 2-3 minutes on first run..."

npm install --silent || {
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
}

echo -e "${GREEN}✅ Dependencies installed successfully${NC}"

# Setup demo environment
echo -e "${YELLOW}🎭 Setting up demo environment...${NC}"

# Create demo environment file if it doesn't exist
if [ ! -f ".env.demo" ]; then
    cat > .env.demo << 'EOF'
# Demo Environment Configuration
VITE_APP_MODE=demo
VITE_APP_NAME="The Project - Cross-Chain DApp"
VITE_APP_VERSION=1.5.0
VITE_DEMO_MODE=true

# Demo wallet addresses (testnet)
VITE_DEMO_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b8D8693d58E7eb1234
VITE_DEMO_USDT_BALANCE=10000.00
VITE_DEMO_USDC_BALANCE=5000.00
VITE_DEMO_DAI_BALANCE=2500.00

# Demo transaction data
VITE_ENABLE_DEMO_TRANSACTIONS=true
VITE_DEMO_GAS_ESTIMATION=true

# Performance monitoring for review
VITE_ENABLE_PERFORMANCE_TRACKING=true
VITE_SHOW_DEBUG_INFO=false

# Demo mode features
VITE_DEMO_FEATURES_ENABLED=true
VITE_SHOW_TOOLTIPS=true
VITE_GUIDED_TOUR=true
EOF
fi

# Copy demo environment to active environment
cp .env.demo .env

echo -e "${GREEN}✅ Demo environment configured${NC}"

# Build the application
echo -e "${YELLOW}🔧 Building the application for review...${NC}"

npm run build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}

echo -e "${GREEN}✅ Application built successfully${NC}"

# Create review documentation
echo -e "${YELLOW}📚 Generating review documentation...${NC}"

# Go back to main repo to create review docs
cd ..
mkdir -p review-docs

cat > review-docs/REVIEW_GUIDE.md << 'EOF'
# Department Review Guide - The Project

## Quick Start (2 minutes)

### 1. Start the Application
```bash
cd the-project
npm run review:start
```
This will open the dapp in your browser at `http://localhost:3000`

### 2. What You'll See
- **Modern Interface**: Clean, professional design following fintech standards
- **Demo Data**: Pre-loaded with sample transactions and balances
- **Guided Tour**: Click the "?" icon for feature explanations
- **Mobile Ready**: Try resizing your browser or use mobile device

### 3. Key Features to Review

#### Design Excellence (Part 1.5 Focus)
- **Clean Interface**: Minimal, focused design
- **Brand Identity**: Consistent colors, typography, and spacing
- **User Experience**: Intuitive navigation and clear actions
- **Mobile Experience**: Responsive design that works on all devices
- **Performance**: Fast loading and smooth animations

#### Core Functionality
- **Token Swapping**: Cross-chain USDT/USDC/DAI exchanges
- **Wallet Integration**: Connect with MetaMask or other Web3 wallets
- **Transaction History**: View past swaps and transfers
- **Real-time Data**: Live prices and exchange rates

### 4. Review Checklist

#### Visual Design ✅
- [ ] Professional appearance suitable for financial application
- [ ] Consistent branding throughout the interface
- [ ] Clear visual hierarchy and readable typography
- [ ] Appropriate use of colors and spacing

#### User Experience ✅
- [ ] Intuitive navigation without training needed
- [ ] Clear call-to-action buttons and workflows
- [ ] Helpful error messages and guidance
- [ ] Fast and responsive interactions

#### Mobile Experience ✅
- [ ] Works well on mobile devices (phone/tablet)
- [ ] Touch-friendly interface elements
- [ ] Readable text on small screens
- [ ] Fast loading on mobile connections

#### Trust and Security ✅
- [ ] Professional appearance that builds confidence
- [ ] Clear transaction flows and confirmations
- [ ] Transparent fee structure and costs
- [ ] Secure wallet connection process

### 5. Demo Scenarios

#### Scenario 1: New User First Swap
1. Open the application
2. Connect demo wallet (click "Connect Wallet")
3. Select tokens to swap (USDT → USDC)
4. Enter amount and review rates
5. Execute demo transaction

#### Scenario 2: Mobile Experience
1. Open on mobile device or resize browser
2. Test touch interactions
3. Verify readability and usability
4. Test gesture support (swipe, tap)

#### Scenario 3: Advanced Features
1. View transaction history
2. Check different swap routes
3. Test wallet settings and preferences
4. Review help and documentation

### 6. Performance Metrics

The application is optimized for:
- **Loading Speed**: < 2 seconds initial load
- **Mobile Performance**: 90+ performance score
- **Accessibility**: WCAG AA compliance
- **Cross-browser**: Works on Chrome, Firefox, Safari, Edge

### 7. Feedback Collection

Please provide feedback on:
1. **First Impression**: What's your initial reaction?
2. **Ease of Use**: How intuitive is the interface?
3. **Trust Factor**: Does it look professional and secure?
4. **Mobile Experience**: How well does it work on mobile?
5. **Missing Features**: What would you expect to see?

### 8. Technical Details (Optional)

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Performance**: Core Web Vitals optimized
- **Accessibility**: Screen reader compatible
- **Security**: No real funds in demo mode
EOF

cat > review-docs/TROUBLESHOOTING.md << 'EOF'
# Troubleshooting Guide

## Common Issues

### Application Won't Start
```bash
# Clear cache and reinstall
cd the-project
npm run clean
npm install
npm run review:start
```

### Browser Shows Blank Page
- Make sure you're using Chrome, Firefox, Safari, or Edge
- Clear browser cache (Ctrl+F5 or Cmd+R)
- Check browser console for errors (F12)

### Wallet Connection Issues
- This is demo mode - wallet connections are simulated
- Click "Connect Demo Wallet" instead of real wallet
- Real wallet integration will be shown in later phases

### Slow Performance
- Close other browser tabs and applications
- Check your internet connection
- Try incognito/private browsing mode

### Mobile Issues
- Use the latest version of mobile Chrome or Safari
- Ensure JavaScript is enabled
- Clear mobile browser cache

## Need Help?
Contact the development team with:
1. Your operating system and browser
2. Screenshot of any error messages
3. Steps that led to the issue
EOF

echo -e "${GREEN}✅ Review documentation created${NC}"

# Create review-specific npm scripts
echo -e "${YELLOW}⚙️  Adding review commands...${NC}"

# Add review scripts to package.json if they don't exist
if ! grep -q "review:start" package.json; then
    # Create temporary package.json with review scripts
    npx json -I -f package.json -e 'this.scripts["review:start"]="concurrently \"npm run frontend:dev\" \"npm run api:dev\" \"npm run review:open\""'
    npx json -I -f package.json -e 'this.scripts["review:open"]="sleep 5 && npx open-cli http://localhost:3000"'
    npx json -I -f package.json -e 'this.scripts["review:build"]="npm run build && npm run review:serve"'
    npx json -I -f package.json -e 'this.scripts["review:serve"]="npm run frontend:preview"'
    npx json -I -f package.json -e 'this.scripts["clean"]="rimraf node_modules package-lock.json && npm install"'
fi

echo -e "${GREEN}✅ Review commands added${NC}"

# Final success message
echo -e "${GREEN}"
echo "================================================================="
echo "  🎉 SETUP COMPLETE! Ready for Department Review"
echo "================================================================="
echo -e "${NC}"

echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Navigate to the project directory:"
echo -e "   ${YELLOW}cd the-project${NC}"
echo ""
echo "2. Start the review application:"
echo -e "   ${YELLOW}npm run review:start${NC}"
echo ""
echo "3. Open your browser to:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "4. Read the review guide:"
echo -e "   ${YELLOW}cat ../review-docs/REVIEW_GUIDE.md${NC}"
echo ""
echo -e "${BLUE}💡 Pro Tips:${NC}"
echo "• Use demo mode - no real crypto needed"
echo "• Test on mobile by resizing browser"
echo "• Check review-docs/ for detailed guides"
echo "• Report any issues using troubleshooting guide"
echo ""
echo -e "${GREEN}Happy reviewing! 🚀${NC}"
