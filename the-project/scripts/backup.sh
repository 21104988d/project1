#!/bin/bash

# Stablecoin Arbitrage Platform - Backup Script
# Creates automated backups of database, configuration, and application data

set -e

# Configuration
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Database connection settings
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-stablecoin_arbitrage}"
DB_USER="${DB_USER:-postgres}"

# Create backup directory
mkdir -p "$BACKUP_DIR/database"
mkdir -p "$BACKUP_DIR/configs"
mkdir -p "$BACKUP_DIR/logs"

echo "Starting backup process at $(date)"

# 1. Database backup
echo "Backing up PostgreSQL database..."
PGPASSWORD="$DB_PASSWORD" pg_dump \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    --no-password \
    --verbose \
    --clean \
    --if-exists \
    --create \
    --format=custom \
    > "$BACKUP_DIR/database/db_backup_$DATE.dump"

# Compress database backup
gzip "$BACKUP_DIR/database/db_backup_$DATE.dump"

echo "Database backup completed: $BACKUP_DIR/database/db_backup_$DATE.dump.gz"

# 2. Configuration backup
echo "Backing up configurations..."
tar -czf "$BACKUP_DIR/configs/configs_$DATE.tar.gz" \
    -C /app \
    configs/ \
    docker-compose.yml \
    .env* \
    packages/*/package.json \
    packages/*/tsconfig.json \
    2>/dev/null || true

echo "Configuration backup completed: $BACKUP_DIR/configs/configs_$DATE.tar.gz"

# 3. Application logs backup
echo "Backing up logs..."
if [ -d "/var/log/app" ]; then
    tar -czf "$BACKUP_DIR/logs/logs_$DATE.tar.gz" \
        -C /var/log \
        app/ \
        2>/dev/null || true
    echo "Logs backup completed: $BACKUP_DIR/logs/logs_$DATE.tar.gz"
fi

# 4. Redis backup (if available)
if command -v redis-cli &> /dev/null; then
    echo "Backing up Redis data..."
    redis-cli --rdb "$BACKUP_DIR/database/redis_backup_$DATE.rdb" || true
    gzip "$BACKUP_DIR/database/redis_backup_$DATE.rdb" || true
    echo "Redis backup completed: $BACKUP_DIR/database/redis_backup_$DATE.rdb.gz"
fi

# 5. Cleanup old backups
echo "Cleaning up old backups (older than $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -type f -mtime +$RETENTION_DAYS -delete

# 6. Generate backup manifest
cat > "$BACKUP_DIR/backup_manifest_$DATE.txt" << EOF
Backup Date: $(date)
Database Backup: db_backup_$DATE.dump.gz
Config Backup: configs_$DATE.tar.gz
Logs Backup: logs_$DATE.tar.gz
Redis Backup: redis_backup_$DATE.rdb.gz
Backup Size: $(du -sh $BACKUP_DIR | cut -f1)
EOF

echo "Backup process completed successfully at $(date)"
echo "Backup manifest: $BACKUP_DIR/backup_manifest_$DATE.txt"

# 7. Send notification (optional)
if [ -n "$WEBHOOK_URL" ]; then
    curl -X POST "$WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"Backup completed successfully for Stablecoin Arbitrage Platform at $(date)\"}" \
        2>/dev/null || true
fi
