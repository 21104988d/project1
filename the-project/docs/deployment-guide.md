# Deployment Guide

## Overview

This guide covers deployment procedures for the cross-chain routing platform
across different environments.

## Environments

### Development

- **Purpose**: Local development and testing
- **Database**: Local PostgreSQL
- **Network**: Hardhat local network
- **Frontend**: Vite dev server

### Staging

- **Purpose**: Pre-production testing
- **Database**: Staging PostgreSQL instance
- **Network**: Testnets (Goerli, Arbitrum Goerli, Mumbai)
- **Frontend**: Staging deployment

### Production

- **Purpose**: Live platform
- **Database**: Production PostgreSQL cluster
- **Network**: Mainnets (Ethereum, Arbitrum, Polygon)
- **Frontend**: CDN deployment

## Pre-deployment Checklist

### Code Quality

- [ ] All tests passing (`npm test`)
- [ ] Code linting clean (`npm run lint`)
- [ ] Type checking clean (`npm run typecheck`)
- [ ] Security audit complete
- [ ] Performance testing complete

### Configuration

- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Contract deployment scripts tested
- [ ] Monitoring and logging configured

### Security

- [ ] Private keys secured
- [ ] API keys rotated
- [ ] Smart contracts audited
- [ ] Infrastructure security review complete

## Database Deployment

### Migration Process

```bash
# 1. Backup existing database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Run migrations
npm run migrate

# 3. Verify migration success
npm run migrate:status

# 4. Seed production data (if needed)
npm run seed:production
```

### Rollback Procedure

```bash
# Rollback last migration
npm run migrate:rollback

# Restore from backup if needed
psql $DATABASE_URL < backup_YYYYMMDD_HHMMSS.sql
```

## Smart Contract Deployment

### Testnet Deployment

```bash
# 1. Set environment variables
export PRIVATE_KEY="your-private-key"
export ETHEREUM_RPC_URL="goerli-rpc-url"
export ETHERSCAN_API_KEY="etherscan-api-key"

# 2. Deploy contracts
npm run deploy -w contracts -- --network goerli

# 3. Verify contracts
npm run verify -w contracts -- --network goerli

# 4. Update contract addresses in configuration
```

### Mainnet Deployment

```bash
# 1. Final security check
npm run audit:contracts

# 2. Deploy with multi-sig wallet
npm run deploy:mainnet -w contracts

# 3. Verify on Etherscan
npm run verify:mainnet -w contracts

# 4. Initialize contracts
npm run initialize:mainnet -w contracts
```

### Contract Upgrade Process

```bash
# 1. Deploy new implementation
npm run deploy:upgrade -w contracts

# 2. Propose upgrade (if using timelock)
npm run propose:upgrade -w contracts

# 3. Execute upgrade after timelock
npm run execute:upgrade -w contracts
```

## Backend Deployment

### API Server Deployment

```bash
# 1. Build production bundle
npm run build -w api

# 2. Create deployment package
tar -czf api-$(date +%Y%m%d_%H%M%S).tar.gz -C packages/api dist/

# 3. Deploy to server
scp api-*.tar.gz user@server:/path/to/deployment/
ssh user@server 'cd /path/to/deployment && ./deploy.sh'

# 4. Health check
curl -f http://api-server/health || exit 1
```

### Routing Engine Deployment

```bash
# 1. Build Docker image
docker build -t routing-engine:latest packages/routing-engine/

# 2. Tag for registry
docker tag routing-engine:latest registry.example.com/routing-engine:$(git rev-parse HEAD)

# 3. Push to registry
docker push registry.example.com/routing-engine:$(git rev-parse HEAD)

# 4. Deploy with orchestrator
kubectl apply -f k8s/routing-engine.yaml
```

## Frontend Deployment

### Build Process

```bash
# 1. Install dependencies
npm install

# 2. Build production bundle
npm run build -w frontend

# 3. Optimize bundle
npm run analyze -w frontend
```

### CDN Deployment

```bash
# 1. Sync to S3 bucket
aws s3 sync packages/frontend/dist/ s3://your-bucket-name/ --delete

# 2. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"

# 3. Verify deployment
curl -I https://your-domain.com
```

### Vercel Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy to Vercel
cd packages/frontend
vercel --prod

# 3. Configure domain (if needed)
vercel domains add your-domain.com
```

## Infrastructure Deployment

### Docker Compose (Staging)

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  api:
    image: registry.example.com/api:latest
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    ports:
      - '3000:3000'

  routing-engine:
    image: registry.example.com/routing-engine:latest
    environment:
      - NODE_ENV=production
      - REDIS_URL=${REDIS_URL}
    ports:
      - '3001:3001'

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - '80:80'
      - '443:443'
```

Deploy with:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes (Production)

```yaml
# k8s/api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: registry.example.com/api:latest
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
```

Deploy with:

```bash
kubectl apply -f k8s/
```

## Monitoring and Health Checks

### Health Check Endpoints

- **API**: `GET /health`
- **Routing Engine**: `GET /health`
- **Database**: Connection test query

### Monitoring Setup

```bash
# 1. Set up application monitoring
# Configure Datadog/New Relic/Prometheus

# 2. Set up log aggregation
# Configure ELK stack or similar

# 3. Set up alerting
# Configure PagerDuty/OpsGenie
```

### Key Metrics to Monitor

- API response times
- Database query performance
- Contract gas usage
- Error rates
- Memory and CPU usage
- Network latency

## Rollback Procedures

### Application Rollback

```bash
# 1. Identify previous stable version
git log --oneline -n 10

# 2. Deploy previous version
./deploy.sh <previous-commit-hash>

# 3. Verify rollback success
curl -f https://api.example.com/health
```

### Database Rollback

```bash
# 1. Stop application
kubectl scale deployment api --replicas=0

# 2. Restore database backup
psql $DATABASE_URL < backup_stable.sql

# 3. Restart application
kubectl scale deployment api --replicas=3
```

### Contract Rollback

```bash
# If using upgradeable contracts
npm run rollback:contracts -w contracts

# If not upgradeable, deploy new version
npm run deploy:hotfix -w contracts
```

## Security Considerations

### Production Security

- Use hardware security modules (HSM) for key management
- Implement IP whitelisting for admin functions
- Enable 2FA for all deployment accounts
- Regular security audits and penetration testing

### Network Security

- Use VPC for cloud deployments
- Implement proper firewall rules
- Enable DDoS protection
- Use SSL/TLS for all communications

### Smart Contract Security

- Multi-signature wallets for admin functions
- Timelock contracts for upgrades
- Circuit breakers for emergency stops
- Regular security audits

## Disaster Recovery

### Backup Strategy

- Daily database backups
- Cross-region backup replication
- Configuration backups
- Private key backup procedures

### Recovery Procedures

1. **Data Loss Recovery**
   - Restore from latest backup
   - Replay transactions if possible
   - Validate data integrity

2. **Infrastructure Failure**
   - Failover to backup region
   - Update DNS records
   - Validate all services

3. **Security Breach**
   - Immediate service shutdown
   - Forensic analysis
   - Security patches
   - Gradual service restoration

## Post-Deployment Verification

### Functional Testing

```bash
# 1. Run smoke tests
npm run test:smoke

# 2. Test critical user journeys
npm run test:e2e:critical

# 3. Verify integrations
npm run test:integration:external
```

### Performance Testing

```bash
# 1. Load testing
npm run test:load

# 2. API response time validation
npm run test:performance:api

# 3. Frontend performance audit
npm run test:performance:frontend
```

### Monitoring Validation

- Check all health endpoints
- Verify monitoring dashboards
- Test alerting mechanisms
- Validate log aggregation

## Maintenance Windows

### Scheduled Maintenance

1. **Communication**
   - Notify users 48 hours in advance
   - Post maintenance notices
   - Set up status page

2. **Execution**
   - Enable maintenance mode
   - Perform updates
   - Validate changes
   - Disable maintenance mode

3. **Verification**
   - Full system health check
   - User acceptance testing
   - Performance validation

## Support and Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check connection strings
   - Verify network connectivity
   - Check database server status

2. **Contract Interaction Failures**
   - Verify contract addresses
   - Check network status
   - Validate transaction parameters

3. **Frontend Load Issues**
   - Check CDN status
   - Verify cache settings
   - Validate DNS records

### Emergency Contacts

- Platform Team Lead: [contact]
- DevOps Engineer: [contact]
- Security Team: [contact]
- Infrastructure Provider: [contact]

### Documentation

- Runbooks: `/docs/runbooks/`
- Architecture docs: `/docs/architecture/`
- API documentation: `/docs/api/`
- Contract documentation: `/docs/contracts/`
