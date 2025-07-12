#!/bin/bash

# Stablecoin Arbitrage Platform - Setup Monitoring
# Configures and starts monitoring stack

set -e

echo "Setting up monitoring infrastructure..."

# Create necessary directories
mkdir -p /var/log/app
mkdir -p /var/log/api
mkdir -p /var/log/routing-engine
mkdir -p /backups

# Set permissions
chmod 755 /var/log/app
chmod 755 /var/log/api
chmod 755 /var/log/routing-engine
chmod 755 /backups

# Start monitoring stack
echo "Starting monitoring services..."
docker-compose -f monitoring/docker-compose.monitoring.yml up -d

# Wait for services to start
echo "Waiting for monitoring services to start..."
sleep 30

# Check service health
echo "Checking monitoring service health..."

# Check Prometheus
if curl -f http://localhost:9090/-/healthy >/dev/null 2>&1; then
    echo "✓ Prometheus is healthy"
else
    echo "✗ Prometheus health check failed"
fi

# Check Grafana
if curl -f http://localhost:3001/api/health >/dev/null 2>&1; then
    echo "✓ Grafana is healthy"
else
    echo "✗ Grafana health check failed"
fi

# Check Loki
if curl -f http://localhost:3100/ready >/dev/null 2>&1; then
    echo "✓ Loki is healthy"
else
    echo "✗ Loki health check failed"
fi

# Check AlertManager
if curl -f http://localhost:9093/-/healthy >/dev/null 2>&1; then
    echo "✓ AlertManager is healthy"
else
    echo "✗ AlertManager health check failed"
fi

echo ""
echo "Monitoring setup completed!"
echo ""
echo "Access URLs:"
echo "  Grafana:      http://localhost:3001 (admin/admin123)"
echo "  Prometheus:   http://localhost:9090"
echo "  AlertManager: http://localhost:9093"
echo "  Loki:         http://localhost:3100"
echo ""
echo "To configure automatic backups, add the following to your crontab:"
echo "  0 2 * * * /app/scripts/backup.sh >> /var/log/backup.log 2>&1"
echo ""
echo "To view logs: docker-compose -f monitoring/docker-compose.monitoring.yml logs -f"
