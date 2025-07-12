#!/bin/bash

# Quick rebuild script for development
# This script rebuilds only the application services without touching the database

set -e

echo "🔄 Quick container rebuild (preserving data)..."

# Change to the project directory
cd "$(dirname "$0")"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo_colored() {
    echo -e "${2}${1}${NC}"
}

# Stop only application services (keep database running)
echo_colored "Stopping application services..." $BLUE
docker compose stop api routing-engine frontend

# Rebuild and restart application services
echo_colored "Rebuilding application services..." $BLUE
docker compose build api routing-engine frontend

echo_colored "Starting application services..." $BLUE
docker compose up -d api routing-engine frontend

# Wait for services
echo_colored "Waiting for services to be ready..." $BLUE
sleep 10

# Show status
docker compose ps

echo ""
echo_colored "✅ Quick rebuild completed!" $GREEN
echo_colored "🌐 Services available at the usual ports" $BLUE
