#!/bin/bash

# The Project - Testnet Deployment Script
# Version: 1.0.0
# Date: July 7, 2025

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-testnet}
PROJECT_NAME="theproject"
DOCKER_REGISTRY=${DOCKER_REGISTRY:-"localhost:5000"}

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    # Check environment file
    if [ ! -f ".env.${ENVIRONMENT}" ]; then
        log_error "Environment file .env.${ENVIRONMENT} not found"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Build Docker images
build_images() {
    log_info "Building Docker images for ${ENVIRONMENT}..."
    
    # Build API service
    log_info "Building API service..."
    docker build -f packages/api/Dockerfile -t ${DOCKER_REGISTRY}/${PROJECT_NAME}-api:latest .
    
    # Build Routing Engine service
    log_info "Building Routing Engine service..."
    docker build -f packages/routing-engine/Dockerfile -t ${DOCKER_REGISTRY}/${PROJECT_NAME}-routing-engine:latest .
    
    # Build Frontend service
    log_info "Building Frontend service..."
    docker build -f packages/frontend/Dockerfile -t ${DOCKER_REGISTRY}/${PROJECT_NAME}-frontend:latest .
    
    log_success "Docker images built successfully"
}

# Deploy smart contracts
deploy_contracts() {
    log_info "Deploying smart contracts to ${ENVIRONMENT}..."
    
    # Load environment variables
    source .env.${ENVIRONMENT}
    
    # Deploy contracts using Hardhat
    cd packages/contracts
    npm run deploy:${ENVIRONMENT}
    cd ../..
    
    log_success "Smart contracts deployed successfully"
}

# Run database migrations
run_migrations() {
    log_info "Running database migrations..."
    
    # Start database services
    docker-compose -f docker-compose.${ENVIRONMENT}.yml up -d postgres redis
    
    # Wait for database to be ready
    sleep 10
    
    # Run migrations
    npm run migrate:${ENVIRONMENT}
    
    log_success "Database migrations completed"
}

# Deploy services
deploy_services() {
    log_info "Deploying services to ${ENVIRONMENT}..."
    
    # Deploy using Docker Compose
    docker-compose -f docker-compose.${ENVIRONMENT}.yml up -d
    
    # Wait for services to be healthy
    log_info "Waiting for services to be healthy..."
    sleep 30
    
    # Health check
    check_health
    
    log_success "Services deployed successfully"
}

# Health check
check_health() {
    log_info "Performing health checks..."
    
    # Check API health
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        log_success "API service is healthy"
    else
        log_error "API service health check failed"
        return 1
    fi
    
    # Check Routing Engine health
    if curl -f http://localhost:3002/health > /dev/null 2>&1; then
        log_success "Routing Engine service is healthy"
    else
        log_error "Routing Engine service health check failed"
        return 1
    fi
    
    # Check Frontend health
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        log_success "Frontend service is healthy"
    else
        log_error "Frontend service health check failed"
        return 1
    fi
    
    log_success "All services are healthy"
}

# Setup monitoring
setup_monitoring() {
    log_info "Setting up monitoring and logging..."
    
    # Create monitoring directories
    mkdir -p monitoring/logs
    mkdir -p monitoring/metrics
    
    # Start monitoring services
    docker-compose -f docker-compose.monitoring.yml up -d
    
    log_success "Monitoring and logging configured"
}

# Main deployment function
main() {
    log_info "Starting deployment to ${ENVIRONMENT}..."
    
    check_prerequisites
    build_images
    
    if [ "${ENVIRONMENT}" != "local" ]; then
        deploy_contracts
    fi
    
    run_migrations
    deploy_services
    setup_monitoring
    
    log_success "Deployment to ${ENVIRONMENT} completed successfully!"
    log_info "Frontend: http://localhost:3000"
    log_info "API: http://localhost:3001"
    log_info "Routing Engine: http://localhost:3002"
    log_info "Monitoring: http://localhost:3001/metrics"
}

# Cleanup function
cleanup() {
    log_info "Cleaning up..."
    docker-compose -f docker-compose.${ENVIRONMENT}.yml down
    docker-compose -f docker-compose.monitoring.yml down
}

# Handle script termination
trap cleanup EXIT

# Run main function
main "$@"
