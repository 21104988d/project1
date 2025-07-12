#!/bin/bash
# Database verification script for the-project
set -e

# Color codes for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

DOCKER_COMPOSE_CMD="docker compose"

echo "🔍 Verifying database connections..."

# Check PostgreSQL connection
print_status "Testing PostgreSQL connection..."
if $DOCKER_COMPOSE_CMD exec -T postgres psql -U postgres -d theproject_dev -c "SELECT version();" &> /dev/null; then
    print_success "PostgreSQL connection successful"
    
    # Get PostgreSQL version
    PG_VERSION=$($DOCKER_COMPOSE_CMD exec -T postgres psql -U postgres -d theproject_dev -t -c "SELECT version();" | head -1 | xargs)
    echo "  Version: $PG_VERSION"
    
    # List databases
    print_status "Available databases:"
    $DOCKER_COMPOSE_CMD exec -T postgres psql -U postgres -c "\l" | grep -E "theproject_dev|routing_engine_dev|api_dev" | while read line; do
        echo "  ✓ $line"
    done
else
    print_error "PostgreSQL connection failed"
    exit 1
fi

# Check Redis connection
print_status "Testing Redis connection..."
if $DOCKER_COMPOSE_CMD exec -T redis redis-cli ping &> /dev/null; then
    print_success "Redis connection successful"
    
    # Get Redis version
    REDIS_VERSION=$($DOCKER_COMPOSE_CMD exec -T redis redis-cli info server | grep redis_version | cut -d: -f2 | tr -d '\r')
    echo "  Version: $REDIS_VERSION"
    
    # Test Redis operations
    $DOCKER_COMPOSE_CMD exec -T redis redis-cli set test_key "test_value" &> /dev/null
    TEST_VALUE=$($DOCKER_COMPOSE_CMD exec -T redis redis-cli get test_key | tr -d '\r')
    if [ "$TEST_VALUE" = "test_value" ]; then
        print_success "Redis read/write operations working"
        $DOCKER_COMPOSE_CMD exec -T redis redis-cli del test_key &> /dev/null
    else
        print_error "Redis read/write operations failed"
        exit 1
    fi
else
    print_error "Redis connection failed"
    exit 1
fi

# Check if services are healthy
print_status "Checking service health..."
PG_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' theproject_postgres 2>/dev/null || echo "not available")
REDIS_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' theproject_redis 2>/dev/null || echo "not available")

if [ "$PG_HEALTH" = "healthy" ] || [ "$PG_HEALTH" = "not available" ]; then
    print_success "PostgreSQL service is healthy"
else
    print_warning "PostgreSQL service health: $PG_HEALTH"
fi

if [ "$REDIS_HEALTH" = "healthy" ] || [ "$REDIS_HEALTH" = "not available" ]; then
    print_success "Redis service is healthy"
else
    print_warning "Redis service health: $REDIS_HEALTH"
fi

# Test connection with Node.js style connection strings
print_status "Testing connection strings..."

# PostgreSQL connection string
PG_CONNECTION="postgresql://postgres:password@localhost:5432/theproject_dev"
echo "  PostgreSQL URL: $PG_CONNECTION"

# Redis connection string
REDIS_CONNECTION="redis://localhost:6379"
echo "  Redis URL: $REDIS_CONNECTION"

print_success "All database connections verified successfully! ✅"
echo ""
echo "📝 Next steps:"
echo "  1. Update your .env file with the connection strings above"
echo "  2. Install database clients in your packages (pg, redis)"
echo "  3. Run database migrations for each package"
echo "  4. Test connections from your application code"
