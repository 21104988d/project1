# Monitoring and Backup Deployment Guide

This guide covers the complete setup of monitoring, logging, and backup systems
for the Stablecoin Arbitrage Platform.

## Quick Start

### 1. Setup Monitoring Stack

```bash
# Run the monitoring setup script
./scripts/setup-monitoring.sh

# Or manually start monitoring services
docker-compose -f monitoring/docker-compose.monitoring.yml up -d
```

### 2. Setup Automatic Backups

```bash
# Add backup cron job (runs daily at 2 AM)
echo "0 2 * * * /app/scripts/backup.sh >> /var/log/backup.log 2>&1" | crontab -

# Test backup manually
./scripts/backup.sh
```

### 3. Start Application with Monitoring

```bash
# Start with monitoring exporters
docker-compose --profile monitoring up -d

# Start with both dev tools and monitoring
docker-compose --profile dev-tools --profile monitoring up -d
```

## Monitoring Stack Components

### Prometheus (Port 9090)

- **Purpose**: Metrics collection and alerting
- **URL**: http://localhost:9090
- **Config**: `configs/prometheus.yml`
- **Alerts**: `configs/alert_rules.yml`

**Key Metrics Monitored**:

- API response times and error rates
- Database connection pool status
- Redis cache hit/miss ratios
- System resource usage (CPU, Memory, Disk)
- Custom business metrics (transaction success rates, quote accuracy)

### Grafana (Port 3001)

- **Purpose**: Visualization and dashboards
- **URL**: http://localhost:3001
- **Credentials**: admin / admin123
- **Config**: `configs/grafana/`

**Pre-configured Dashboards**:

- System Overview (CPU, Memory, Disk, Network)
- Application Performance (API metrics, response times)
- Database Performance (PostgreSQL metrics)
- Business Metrics (transaction volumes, success rates)

### Loki (Port 3100)

- **Purpose**: Log aggregation and searching
- **URL**: http://localhost:3100
- **Integration**: Grafana for log visualization

**Log Sources**:

- Application logs (API, Routing Engine)
- System logs
- Container logs
- Custom application events

### AlertManager (Port 9093)

- **Purpose**: Alert routing and notifications
- **URL**: http://localhost:9093
- **Config**: `configs/alertmanager.yml`

**Alert Channels**:

- Webhook notifications
- Email alerts (configure SMTP)
- Slack integration (configure webhook)

## Backup System

### Automated Backups

The backup system runs daily and includes:

1. **Database Backup**: PostgreSQL dump with compression
2. **Redis Backup**: RDB snapshot
3. **Configuration Backup**: All config files and environment settings
4. **Application Logs**: Compressed log archives

### Backup Locations

```
/backups/
├── database/
│   ├── db_backup_YYYYMMDD_HHMMSS.dump.gz
│   └── redis_backup_YYYYMMDD_HHMMSS.rdb.gz
├── configs/
│   └── configs_YYYYMMDD_HHMMSS.tar.gz
├── logs/
│   └── logs_YYYYMMDD_HHMMSS.tar.gz
└── backup_manifest_YYYYMMDD_HHMMSS.txt
```

### Recovery Procedures

```bash
# List available backups
./scripts/recovery.sh -l

# Restore from specific backup (interactive)
./scripts/recovery.sh -d 20240707_020000

# Force restore without confirmation
./scripts/recovery.sh -f -d 20240707_020000
```

## Performance Metrics

### Application Metrics

| Metric                              | Target  | Alert Threshold |
| ----------------------------------- | ------- | --------------- |
| API Response Time (95th percentile) | < 200ms | > 2s            |
| Quote Generation Time               | < 100ms | > 500ms         |
| Transaction Success Rate            | > 99%   | < 95%           |
| Database Query Time                 | < 50ms  | > 1s            |
| Cache Hit Ratio                     | > 90%   | < 80%           |

### System Metrics

| Metric          | Target | Alert Threshold |
| --------------- | ------ | --------------- |
| CPU Usage       | < 70%  | > 80%           |
| Memory Usage    | < 80%  | > 90%           |
| Disk Space      | < 80%  | > 90%           |
| Network Latency | < 10ms | > 100ms         |

## Security Monitoring

### Security Alerts

- Unusual API access patterns
- Failed authentication attempts
- Database connection anomalies
- Resource exhaustion attacks
- Suspicious transaction patterns

### Log Analysis

Key log patterns monitored:

- Authentication failures
- Rate limiting triggers
- Error rate spikes
- Performance degradation
- Security events

## Troubleshooting

### Common Issues

1. **Prometheus not scraping metrics**

   ```bash
   # Check service discovery
   curl http://localhost:9090/api/v1/targets

   # Verify service health endpoints
   curl http://localhost:3001/metrics
   curl http://localhost:3002/metrics
   ```

2. **Grafana dashboard not loading data**

   ```bash
   # Check datasource connection
   docker-compose -f monitoring/docker-compose.monitoring.yml logs grafana

   # Verify Prometheus connectivity
   curl http://prometheus:9090/api/v1/query?query=up
   ```

3. **Backup failures**

   ```bash
   # Check backup logs
   tail -f /var/log/backup.log

   # Verify database connectivity
   PGPASSWORD=$DB_PASSWORD pg_isready -h localhost -p 5432 -U postgres

   # Check disk space
   df -h /backups
   ```

4. **Recovery failures**

   ```bash
   # Verify backup integrity
   gunzip -t /backups/database/db_backup_*.dump.gz

   # Check database permissions
   PGPASSWORD=$DB_PASSWORD psql -h localhost -U postgres -c "SELECT version();"
   ```

### Log Locations

- Application logs: `/var/log/app/`
- API logs: `/var/log/api/`
- Routing Engine logs: `/var/log/routing-engine/`
- Backup logs: `/var/log/backup.log`
- System logs: `/var/log/syslog`

### Performance Tuning

1. **Increase scrape intervals** if monitoring overhead is too high
2. **Adjust log retention** based on disk space constraints
3. **Configure alert thresholds** based on baseline performance
4. **Optimize backup schedules** for your recovery requirements

## Maintenance

### Daily Tasks

- Review alert notifications
- Check backup completion status
- Monitor system resource usage
- Verify service health status

### Weekly Tasks

- Review performance trends
- Update alert thresholds if needed
- Test backup recovery procedures
- Clean up old log files

### Monthly Tasks

- Review and update monitoring configurations
- Audit security logs
- Test disaster recovery procedures
- Update monitoring dashboard queries

## Integration with CI/CD

### Deployment Health Checks

```bash
# Add to deployment pipeline
./scripts/health-check.sh --timeout 300 --services api,routing-engine,postgres,redis

# Verify monitoring after deployment
curl -f http://localhost:9090/-/healthy
curl -f http://localhost:3001/api/health
```

### Automated Testing

Include monitoring validation in your test suites:

- Verify metrics endpoint availability
- Test alert rule syntax
- Validate backup/recovery procedures
- Check log parsing configurations

This monitoring and backup infrastructure provides comprehensive observability
and disaster recovery capabilities for the Stablecoin Arbitrage Platform.
