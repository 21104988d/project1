#!/bin/bash
# Database setup script for the-project
set -e

echo "🗄️  Setting up database infrastructure for the-project..."

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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to get the correct docker-compose command
get_docker_compose_command() {
    if command -v docker-compose &> /dev/null; then
        echo "docker-compose"
    else
        echo "docker compose"
    fi
}

DOCKER_COMPOSE_CMD=$(get_docker_compose_command)

# Make the database init script executable
chmod +x ./scripts/database/init-multiple-databases.sh

# Start database services
print_status "Starting PostgreSQL and Redis services..."
$DOCKER_COMPOSE_CMD up -d postgres redis

# Wait for services to be ready
print_status "Waiting for database services to be ready..."
timeout=120
counter=0

while [ $counter -lt $timeout ]; do
    if $DOCKER_COMPOSE_CMD exec -T postgres pg_isready -U postgres &> /dev/null && \
       $DOCKER_COMPOSE_CMD exec -T redis redis-cli ping &> /dev/null; then
        print_success "Database services are ready!"
        break
    fi
    
    counter=$((counter + 1))
    sleep 1
    
    if [ $counter -eq $timeout ]; then
        print_error "Database services failed to start within $timeout seconds"
        exit 1
    fi
done

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file from template..."
    cp .env.example .env
    print_success ".env file created"
fi

# Display connection information
print_success "Database setup completed successfully!"
echo ""
echo "📊 Database Connection Information:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PostgreSQL:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Databases: theproject_dev, routing_engine_dev, api_dev"
echo "  Username: postgres"
echo "  Password: password"
echo ""
echo "Redis:"
echo "  Host: localhost"
echo "  Port: 6379"
echo "  No password required"
echo ""
echo "🔧 Management Tools:"
echo "  pgAdmin: http://localhost:8080 (admin@theproject.local / password)"
echo "  Redis Commander: http://localhost:8081"
echo ""
echo "🔗 Connection URLs:"
echo "  PostgreSQL: postgresql://postgres:password@localhost:5432/theproject_dev"
echo "  Redis: redis://localhost:6379"
echo ""
echo "To stop services: docker-compose down"
echo "To restart services: docker-compose up -d postgres redis"
