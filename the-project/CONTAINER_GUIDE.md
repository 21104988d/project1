# Container Management Guide

This guide provides comprehensive instructions for managing the Docker containers in this project.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ installed
- At least 4GB of available RAM
- At least 2GB of free disk space

## Container Architecture

The project consists of the following services:

### Core Services
- **postgres**: PostgreSQL database (port 5432)
- **redis**: Redis cache (port 6379)
- **api**: Backend API service (port 3001)
- **routing-engine**: Cross-chain routing service (port 3002)
- **frontend**: React frontend (port 3000)

### Development Tools (optional)
- **pgadmin**: Database administration (port 8080)
- **redis-commander**: Redis GUI (port 8081)

### Monitoring Services (optional)
- **postgres-exporter**: PostgreSQL metrics (port 9187)
- **redis-exporter**: Redis metrics (port 9121)

## Quick Start

### Full Rebuild
```bash
# Complete rebuild from scratch (removes all data)
./rebuild-containers.sh
```

### Quick Rebuild (Development)
```bash
# Rebuild only application services (preserves database)
./quick-rebuild.sh
```

### Standard Operations
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f api
```

## Development Profiles

### Start with Development Tools
```bash
docker compose --profile dev-tools up -d
```
This includes PgAdmin and Redis Commander for database management.

### Start with Monitoring
```bash
docker compose --profile monitoring up -d
```
This includes metrics exporters for monitoring.

### Start Everything
```bash
docker compose --profile dev-tools --profile monitoring up -d
```

## Manual Build Commands

### Build All Services
```bash
docker compose build
```

### Build Specific Service
```bash
docker compose build api
docker compose build frontend
docker compose build routing-engine
```

### Build Without Cache
```bash
docker compose build --no-cache
```

## Troubleshooting

### Check Service Health
```bash
# Check all services
docker compose ps

# Check specific service logs
docker compose logs api

# Check service health
docker compose exec api curl http://localhost:3001/health
```

### Database Issues
```bash
# Reset database (WARNING: This removes all data)
docker compose down -v
docker compose up -d postgres
```

### Port Conflicts
If you get port conflicts, check what's running on the ports:
```bash
# Check what's using port 3000
lsof -i :3000

# Or use netstat
netstat -tulpn | grep :3000
```

### Clean Up Everything
```bash
# Stop and remove all containers and volumes
docker compose down -v --remove-orphans

# Remove all project images
docker images | grep "theproject" | awk '{print $3}' | xargs docker rmi -f

# Clean up build cache
docker builder prune -f
```

## Environment Variables

The following environment variables can be customized:

### API Service
- `NODE_ENV`: Environment (development/production)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `PORT`: API port (default: 3001)

### Routing Engine
- `NODE_ENV`: Environment (development/production)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `PORT`: Service port (default: 3002)

### Frontend
- `VITE_API_URL`: API endpoint URL
- `VITE_ROUTING_ENGINE_URL`: Routing engine endpoint URL

## Development Workflow

1. **Make code changes**
2. **Rebuild affected services**:
   ```bash
   # For API changes
   docker compose build api && docker compose up -d api
   
   # For frontend changes
   docker compose build frontend && docker compose up -d frontend
   
   # For routing engine changes
   docker compose build routing-engine && docker compose up -d routing-engine
   ```
3. **Test changes**
4. **View logs if needed**:
   ```bash
   docker compose logs -f [service-name]
   ```

## Performance Tips

- Use `quick-rebuild.sh` during development to avoid rebuilding the database
- Use Docker BuildKit for faster builds: `export DOCKER_BUILDKIT=1`
- Regularly clean up unused images: `docker image prune -f`
- Monitor resource usage: `docker stats`

## Security Notes

- Default passwords are set for development only
- Change default credentials before production deployment
- Use environment variables for sensitive configuration
- Regularly update base images for security patches

## Backup and Recovery

### Backup Database
```bash
docker compose exec postgres pg_dump -U postgres theproject_dev > backup.sql
```

### Restore Database
```bash
docker compose exec -T postgres psql -U postgres theproject_dev < backup.sql
```

### Backup Redis
```bash
docker compose exec redis redis-cli BGSAVE
docker compose cp redis:/data/dump.rdb ./redis-backup.rdb
```

## Useful Commands

```bash
# Enter container shell
docker compose exec api sh
docker compose exec postgres psql -U postgres

# Copy files from container
docker compose cp api:/app/logs ./api-logs

# Check resource usage
docker compose top

# Scale services (if supported)
docker compose up -d --scale api=2
```
