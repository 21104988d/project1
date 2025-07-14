#!/bin/bash

# 🚀 One-Button Deployment Script for PayMe DApp
# Updated: July 14, 2025
# This script deploys the entire application stack

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

echo "🚀 PayMe DApp One-Button Deployment"
echo "=================================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    print_status "Please copy .env.example to .env and fill in your values:"
    echo -e "${BLUE}cp .env.example .env${NC}"
    echo -e "${BLUE}nano .env  # or use your preferred editor${NC}"
    exit 1
fi

# Load environment variables
source .env

# Check required environment variables
required_vars=("INFURA_PROJECT_ID" "DEPLOYER_PRIVATE_KEY" "ETHERSCAN_API_KEY")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    print_error "Missing required environment variables:"
    for var in "${missing_vars[@]}"; do
        echo -e "  ${RED}✗${NC} $var"
    done
    print_status "Please update your .env file with the missing values."
    exit 1
fi

print_status "Environment variables validated ✓"
echo ""

# Step 1: Infrastructure Setup
print_step "1/6 Setting up infrastructure..."
print_status "Starting Docker containers..."
docker-compose up -d postgres redis

print_status "Waiting for services to be ready..."
sleep 10

# Check if services are running
if ! docker-compose ps | grep -q "Up"; then
    print_error "Docker services failed to start"
    docker-compose logs
    exit 1
fi

print_status "Infrastructure ready ✓"
echo ""

# Step 2: Install Dependencies
print_step "2/6 Installing dependencies..."
npm install

print_status "Dependencies installed ✓"
echo ""

# Step 3: Build Contracts
print_step "3/6 Building smart contracts..."
npm run contracts:compile

if [ $? -ne 0 ]; then
    print_error "Contract compilation failed"
    exit 1
fi

print_status "Smart contracts compiled ✓"
echo ""

# Step 4: Deploy to Testnets
print_step "4/6 Deploying to testnets..."

print_status "Deploying to Sepolia..."
npm run deploy:testnet:sepolia

print_status "Deploying to Arbitrum Sepolia..."
npm run deploy:testnet:arbitrum

print_status "Smart contracts deployed ✓"
echo ""

# Step 5: Build Frontend
print_step "5/6 Building frontend..."
npm run frontend:build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi

print_status "Frontend built ✓"
echo ""

# Step 6: Start Services
print_step "6/6 Starting application services..."

print_status "Starting API server..."
npm run api:dev &
API_PID=$!

print_status "Starting frontend development server..."
npm run frontend:dev &
FRONTEND_PID=$!

print_status "Waiting for services to start..."
sleep 5

# Check if services are running
if ! kill -0 $API_PID 2>/dev/null; then
    print_error "API server failed to start"
    exit 1
fi

if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    print_error "Frontend server failed to start"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "===================================="
echo ""
print_status "Services running:"
echo -e "  ${GREEN}✓${NC} API Server: http://localhost:3001"
echo -e "  ${GREEN}✓${NC} Frontend: http://localhost:5173"
echo -e "  ${GREEN}✓${NC} Database: localhost:5432"
echo -e "  ${GREEN}✓${NC} Redis: localhost:6379"
echo ""
print_status "Contract deployments:"
echo -e "  ${GREEN}✓${NC} Sepolia Etherscan: https://sepolia.etherscan.io"
echo -e "  ${GREEN}✓${NC} Arbitrum Sepolia: https://sepolia.arbiscan.io"
echo ""
print_status "To stop all services:"
echo -e "${BLUE}kill $API_PID $FRONTEND_PID${NC}"
echo -e "${BLUE}docker-compose down${NC}"
echo ""
print_status "Happy building! 🚀"

# Keep script running to monitor services
trap "kill $API_PID $FRONTEND_PID 2>/dev/null; docker-compose down; exit" INT TERM
wait
