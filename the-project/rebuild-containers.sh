#!/bin/bash

# Rebuild containers script for the-project
# This script will rebuild all containers from scratch

set -e

echo "🚀 Starting container rebuild process..."

# Change to the project directory
cd "$(dirname "$0")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo_colored() {
    echo -e "${2}${1}${NC}"
}

# Step 1: Stop and remove existing containers
echo_colored "Step 1: Stopping and removing existing containers..." $BLUE
docker compose down --volumes --remove-orphans || true

# Step 2: Remove existing images (optional - uncomment if you want to rebuild from scratch)
echo_colored "Step 2: Removing existing images..." $YELLOW
echo "Removing project-specific images..."
docker images | grep "theproject" | awk '{print $3}' | xargs -r docker rmi -f || true

# Step 3: Clean up build cache (optional)
echo_colored "Step 3: Cleaning up Docker build cache..." $YELLOW
docker builder prune -f || true

# Step 4: Install/update dependencies
echo_colored "Step 4: Installing/updating Node.js dependencies..." $BLUE
npm install

# Step 5: Build packages
echo_colored "Step 5: Building packages..." $BLUE
npm run build

# Step 6: Build Docker images
echo_colored "Step 6: Building Docker images..." $BLUE
docker compose build --no-cache

# Step 7: Start services
echo_colored "Step 7: Starting services..." $GREEN
docker compose up -d

# Step 8: Wait for services to be healthy
echo_colored "Step 8: Waiting for services to become healthy..." $BLUE
echo "Waiting for database to be ready..."
timeout 60 bash -c 'until docker compose exec postgres pg_isready -U postgres; do sleep 2; done'

echo "Waiting for Redis to be ready..."
timeout 30 bash -c 'until docker compose exec redis redis-cli ping | grep -q PONG; do sleep 2; done'

echo "Waiting for API to be ready..."
timeout 60 bash -c 'until curl -f http://localhost:3001/health 2>/dev/null; do sleep 5; done'

echo "Waiting for routing engine to be ready..."
timeout 60 bash -c 'until curl -f http://localhost:3002/health 2>/dev/null; do sleep 5; done'

echo "Waiting for frontend to be ready..."
timeout 60 bash -c 'until curl -f http://localhost:3000/health 2>/dev/null; do sleep 5; done'

# Step 9: Show status
echo_colored "Step 9: Checking service status..." $GREEN
docker compose ps

echo ""
echo_colored "✅ Container rebuild completed successfully!" $GREEN
echo_colored "🌐 Frontend available at: http://localhost:3000" $BLUE
echo_colored "🔌 API available at: http://localhost:3001" $BLUE
echo_colored "🚀 Routing Engine available at: http://localhost:3002" $BLUE
echo_colored "📊 PgAdmin (dev-tools profile): http://localhost:8080" $YELLOW
echo_colored "🔍 Redis Commander (dev-tools profile): http://localhost:8081" $YELLOW
echo ""
echo_colored "To view logs: docker compose logs -f" $BLUE
echo_colored "To stop services: docker compose down" $BLUE
echo_colored "To start dev tools: docker compose --profile dev-tools up -d" $YELLOW
echo_colored "To start monitoring: docker compose --profile monitoring up -d" $YELLOW
