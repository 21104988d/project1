#!/bin/bash

# Stablecoin Arbitrage Platform - Recovery Script
# Restores database and configuration from backups

set -e

# Configuration
BACKUP_DIR="/backups"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-stablecoin_arbitrage}"
DB_USER="${DB_USER:-postgres}"

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  -d DATE     Restore from specific date (YYYYMMDD_HHMMSS)"
    echo "  -l          List available backups"
    echo "  -f          Force recovery without confirmation"
    echo "  -h          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -l                           # List available backups"
    echo "  $0 -d 20240707_143000          # Restore from specific backup"
    echo "  $0 -f -d 20240707_143000       # Force restore without confirmation"
    exit 1
}

# Function to list available backups
list_backups() {
    echo "Available backups:"
    echo "=================="
    if [ -d "$BACKUP_DIR/database" ]; then
        echo "Database backups:"
        ls -la "$BACKUP_DIR/database/"db_backup_*.dump.gz 2>/dev/null | awk '{print $9, $5, $6, $7, $8}' | column -t || echo "No database backups found"
        echo ""
    fi
    
    if [ -d "$BACKUP_DIR/configs" ]; then
        echo "Configuration backups:"
        ls -la "$BACKUP_DIR/configs/"configs_*.tar.gz 2>/dev/null | awk '{print $9, $5, $6, $7, $8}' | column -t || echo "No configuration backups found"
        echo ""
    fi
    
    echo "Backup manifests:"
    ls -la "$BACKUP_DIR/"backup_manifest_*.txt 2>/dev/null | awk '{print $9, $5, $6, $7, $8}' | column -t || echo "No manifests found"
}

# Function to validate backup exists
validate_backup() {
    local date=$1
    local db_backup="$BACKUP_DIR/database/db_backup_${date}.dump.gz"
    local config_backup="$BACKUP_DIR/configs/configs_${date}.tar.gz"
    
    if [ ! -f "$db_backup" ]; then
        echo "Error: Database backup not found: $db_backup"
        return 1
    fi
    
    if [ ! -f "$config_backup" ]; then
        echo "Warning: Configuration backup not found: $config_backup"
    fi
    
    return 0
}

# Function to restore database
restore_database() {
    local date=$1
    local db_backup="$BACKUP_DIR/database/db_backup_${date}.dump.gz"
    
    echo "Restoring database from: $db_backup"
    
    # Create a temporary directory for extraction
    temp_dir=$(mktemp -d)
    gunzip -c "$db_backup" > "$temp_dir/db_backup.dump"
    
    # Stop services that depend on database
    echo "Stopping services..."
    docker-compose stop api routing-engine 2>/dev/null || true
    
    # Restore database
    echo "Restoring database..."
    PGPASSWORD="$DB_PASSWORD" pg_restore \
        -h "$DB_HOST" \
        -p "$DB_PORT" \
        -U "$DB_USER" \
        -d postgres \
        --clean \
        --if-exists \
        --create \
        --verbose \
        "$temp_dir/db_backup.dump"
    
    # Cleanup
    rm -rf "$temp_dir"
    
    echo "Database restoration completed"
}

# Function to restore Redis
restore_redis() {
    local date=$1
    local redis_backup="$BACKUP_DIR/database/redis_backup_${date}.rdb.gz"
    
    if [ -f "$redis_backup" ]; then
        echo "Restoring Redis from: $redis_backup"
        
        # Stop Redis
        docker-compose stop redis 2>/dev/null || true
        
        # Extract and restore
        temp_dir=$(mktemp -d)
        gunzip -c "$redis_backup" > "$temp_dir/dump.rdb"
        
        # Copy to Redis data directory (adjust path as needed)
        docker-compose exec redis redis-cli FLUSHALL
        docker cp "$temp_dir/dump.rdb" $(docker-compose ps -q redis):/data/dump.rdb
        
        # Restart Redis
        docker-compose start redis
        
        rm -rf "$temp_dir"
        echo "Redis restoration completed"
    fi
}

# Function to restore configurations
restore_configs() {
    local date=$1
    local config_backup="$BACKUP_DIR/configs/configs_${date}.tar.gz"
    
    if [ -f "$config_backup" ]; then
        echo "Restoring configurations from: $config_backup"
        
        # Create backup of current configs
        timestamp=$(date +%Y%m%d_%H%M%S)
        tar -czf "/tmp/current_configs_${timestamp}.tar.gz" \
            -C /app \
            configs/ \
            docker-compose.yml \
            .env* \
            2>/dev/null || true
        
        echo "Current configs backed up to: /tmp/current_configs_${timestamp}.tar.gz"
        
        # Restore configurations
        tar -xzf "$config_backup" -C /app
        
        echo "Configuration restoration completed"
    fi
}

# Main recovery function
perform_recovery() {
    local date=$1
    local force=$2
    
    if ! validate_backup "$date"; then
        echo "Backup validation failed"
        exit 1
    fi
    
    # Show backup manifest if available
    local manifest="$BACKUP_DIR/backup_manifest_${date}.txt"
    if [ -f "$manifest" ]; then
        echo "Backup manifest:"
        echo "================"
        cat "$manifest"
        echo ""
    fi
    
    # Confirmation prompt
    if [ "$force" != "true" ]; then
        echo "WARNING: This will restore the system to backup from $date"
        echo "This operation will:"
        echo "  - Stop running services"
        echo "  - Replace current database with backup"
        echo "  - Replace current configurations with backup"
        echo "  - Restart services"
        echo ""
        read -p "Are you sure you want to continue? (yes/no): " confirm
        if [ "$confirm" != "yes" ]; then
            echo "Recovery cancelled"
            exit 0
        fi
    fi
    
    echo "Starting recovery process..."
    
    # Perform recovery steps
    restore_database "$date"
    restore_redis "$date"
    restore_configs "$date"
    
    # Restart services
    echo "Restarting services..."
    docker-compose up -d
    
    # Wait for services to come up
    echo "Waiting for services to start..."
    sleep 30
    
    # Health check
    echo "Performing health checks..."
    if curl -f http://localhost:3000/health >/dev/null 2>&1; then
        echo "✓ API service is healthy"
    else
        echo "✗ API service health check failed"
    fi
    
    if curl -f http://localhost:8080/health >/dev/null 2>&1; then
        echo "✓ Routing Engine service is healthy"
    else
        echo "✗ Routing Engine service health check failed"
    fi
    
    echo "Recovery process completed!"
    echo "Please verify that all services are functioning correctly."
}

# Parse command line arguments
FORCE=false
DATE=""
LIST=false

while getopts "d:lfh" opt; do
    case $opt in
        d)
            DATE="$OPTARG"
            ;;
        l)
            LIST=true
            ;;
        f)
            FORCE=true
            ;;
        h)
            usage
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            usage
            ;;
    esac
done

# Main logic
if [ "$LIST" = true ]; then
    list_backups
    exit 0
fi

if [ -z "$DATE" ]; then
    echo "Error: Date is required for recovery"
    echo ""
    usage
fi

perform_recovery "$DATE" "$FORCE"
