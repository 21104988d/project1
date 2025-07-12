# Deployment Guide

This guide provides comprehensive instructions for deploying The Project across
different environments, from local development to production infrastructure.

## Overview

The Project uses a modern deployment stack designed for scalability and
reliability:

- **Containerization**: Docker for consistent environments
- **Orchestration**: Kubernetes for production deployment
- **Infrastructure**: Cloud-native services (AWS/GCP/Azure)
- **CI/CD**: Automated testing and deployment pipelines
- **Monitoring**: Comprehensive observability and alerting

## Prerequisites

### Required Tools

```bash
# Development tools
Node.js >= 18.0.0
npm >= 8.0.0 or yarn >= 1.22.0
Docker >= 20.10.0
Docker Compose >= 2.0.0

# Infrastructure tools
kubectl >= 1.25.0
helm >= 3.8.0
terraform >= 1.3.0 (for infrastructure provisioning)

# Optional but recommended
git >= 2.34.0
curl >= 7.68.0
jq >= 1.6 (for JSON processing)
```

### Environment Variables

Create environment configuration files for each deployment target:

```bash
# .env.development
NODE_ENV=development
API_BASE_URL=http://localhost:3001
WS_URL=ws://localhost:3001/ws
DATABASE_URL=postgresql://postgres:password@localhost:5432/theproject_dev
REDIS_URL=redis://localhost:6379
ETHEREUM_RPC_URL=https://eth-goerli.g.alchemy.com/v2/your-api-key
ARBITRUM_RPC_URL=https://arb-goerli.g.alchemy.com/v2/your-api-key

# .env.production
NODE_ENV=production
API_BASE_URL=https://api.theproject.com
WS_URL=wss://api.theproject.com/ws
DATABASE_URL=postgresql://user:pass@prod-db:5432/theproject_prod
REDIS_URL=redis://prod-redis:6379
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/your-api-key
```

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/theproject/the-project.git
cd the-project

# Install dependencies for all packages
npm install

# Or with yarn
yarn install
```

### 2. Start Infrastructure Services

```bash
# Start PostgreSQL and Redis using Docker Compose
docker-compose -f docker-compose.dev.yml up -d postgres redis

# Wait for services to be ready
docker-compose -f docker-compose.dev.yml logs -f postgres redis
```

### 3. Initialize Database

```bash
# Run database migrations
cd packages/api
npm run db:migrate

# Seed with test data
npm run db:seed

# Verify setup
npm run db:status
```

### 4. Start Development Services

```bash
# Start all services in development mode
npm run dev

# Or start services individually
npm run dev:frontend   # React app on http://localhost:3000
npm run dev:api        # API server on http://localhost:3001
npm run dev:routing    # Routing engine on http://localhost:3002
npm run dev:docs       # Documentation on http://localhost:3003
```

### 5. Verify Local Setup

```bash
# Health check API
curl http://localhost:3001/health

# Test quote endpoint
curl -X POST http://localhost:3001/api/v1/quote \
  -H "Content-Type: application/json" \
  -d '{
    "tokenIn": "USDT",
    "tokenOut": "USDC",
    "amountIn": "1000000",
    "chainIdIn": 5,
    "chainIdOut": 421613
  }'
```

## Docker Deployment

### Development with Docker

```bash
# Build all services
docker-compose build

# Start complete development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Setup

```bash
# Build production images
docker build -f packages/frontend/Dockerfile -t theproject/frontend:latest packages/frontend/
docker build -f packages/api/Dockerfile -t theproject/api:latest packages/api/
docker build -f packages/routing-engine/Dockerfile -t theproject/routing-engine:latest packages/routing-engine/

# Tag and push to registry
docker tag theproject/frontend:latest your-registry.com/theproject/frontend:v1.0.0
docker push your-registry.com/theproject/frontend:v1.0.0
```

## Kubernetes Deployment

### 1. Infrastructure Setup

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: theproject
  labels:
    name: theproject
```

### 2. Database Configuration

```yaml
# k8s/postgres.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: theproject
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15-alpine
          env:
            - name: POSTGRES_DB
              value: 'theproject_prod'
            - name: POSTGRES_USER
              value: 'theproject'
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: password
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: postgres-storage
      spec:
        accessModes: ['ReadWriteOnce']
        resources:
          requests:
            storage: 100Gi
```

### 3. Application Services

```yaml
# k8s/api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: theproject
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
          image: theproject/api:v1.0.0
          ports:
            - containerPort: 3001
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: database-secret
                  key: url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: redis-secret
                  key: url
          resources:
            requests:
              memory: '256Mi'
              cpu: '200m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 5
            periodSeconds: 5
```

### 4. Load Balancer and Ingress

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: theproject-ingress
  namespace: theproject
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
    nginx.ingress.kubernetes.io/use-regex: 'true'
    cert-manager.io/cluster-issuer: 'letsencrypt-prod'
spec:
  tls:
    - hosts:
        - api.theproject.com
        - app.theproject.com
      secretName: theproject-tls
  rules:
    - host: api.theproject.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 3001
    - host: app.theproject.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
```

### 5. Deploy to Kubernetes

```bash
# Apply configurations
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/redis.yaml
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/routing-engine-deployment.yaml
kubectl apply -f k8s/services.yaml
kubectl apply -f k8s/ingress.yaml

# Verify deployment
kubectl get pods -n theproject
kubectl get services -n theproject
kubectl get ingress -n theproject

# Check logs
kubectl logs -f deployment/api -n theproject
```

## Cloud Platform Deployment

### AWS Deployment

```yaml
# terraform/aws/main.tf
provider "aws" {
  region = var.aws_region
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "theproject-cluster"
  cluster_version = "1.25"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  node_groups = {
    main = {
      desired_capacity = 3
      max_capacity     = 10
      min_capacity     = 3

      instance_types = ["t3.medium"]

      k8s_labels = {
        Environment = "production"
        Application = "theproject"
      }
    }
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier = "theproject-postgres"

  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.micro"

  allocated_storage     = 100
  max_allocated_storage = 1000

  db_name  = "theproject_prod"
  username = "theproject"
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  skip_final_snapshot = false
  final_snapshot_identifier = "theproject-postgres-final-snapshot"

  tags = {
    Name = "theproject-postgres"
    Environment = "production"
  }
}
```

### Google Cloud Platform (GCP)

```yaml
# terraform/gcp/main.tf
provider "google" {
  project = var.project_id
  region  = var.region
}

# GKE Cluster
resource "google_container_cluster" "theproject" {
  name     = "theproject-cluster"
  location = var.region

  initial_node_count = 3

  node_config {
    machine_type = "e2-standard-2"
    disk_size_gb = 50

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    labels = {
      environment = "production"
      application = "theproject"
    }
  }

  network_policy {
    enabled = true
  }
}

# Cloud SQL PostgreSQL
resource "google_sql_database_instance" "postgres" {
  name             = "theproject-postgres"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    backup_configuration {
      enabled = true
      start_time = "03:00"
    }

    ip_configuration {
      ipv4_enabled = false
      private_network = google_compute_network.vpc.id
    }
  }
}
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: theproject

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run security audit
        run: npm audit --audit-level=moderate

      - name: Run linting
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push API image
        uses: docker/build-push-action@v4
        with:
          context: packages/api
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/api:${{ github.sha }}

      - name: Build and push Frontend image
        uses: docker/build-push-action@v4
        with:
          context: packages/frontend
          push: true
          tags:
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Update kubeconfig
        run: aws eks update-kubeconfig --name theproject-cluster

      - name: Deploy to Kubernetes
        run: |
          sed -i 's|IMAGE_TAG|${{ github.sha }}|g' k8s/api-deployment.yaml
          sed -i 's|IMAGE_TAG|${{ github.sha }}|g' k8s/frontend-deployment.yaml
          kubectl apply -f k8s/

      - name: Verify deployment
        run: |
          kubectl rollout status deployment/api -n theproject
          kubectl rollout status deployment/frontend -n theproject
```

## Monitoring and Observability

### Prometheus Monitoring

```yaml
# k8s/monitoring.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: theproject
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'theproject-api'
      static_configs:
      - targets: ['api-service:3001']
      metrics_path: /metrics
    - job_name: 'theproject-routing'
      static_configs:
      - targets: ['routing-service:3002']
      metrics_path: /metrics
```

### Grafana Dashboards

```json
{
  "dashboard": {
    "title": "The Project - System Overview",
    "panels": [
      {
        "title": "API Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{endpoint}}"
          }
        ]
      },
      {
        "title": "Transaction Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "rate(transactions_total{status=\"success\"}[5m]) / rate(transactions_total[5m]) * 100",
            "legendFormat": "Success Rate %"
          }
        ]
      }
    ]
  }
}
```

## Production Readiness Checklist

### Security

- [ ] SSL/TLS certificates configured and auto-renewal setup
- [ ] API rate limiting and DDoS protection enabled
- [ ] Database encryption at rest and in transit
- [ ] Secret management using Kubernetes secrets or cloud secret managers
- [ ] Regular security updates and vulnerability scanning
- [ ] Network policies and firewall rules configured
- [ ] Container image scanning in CI/CD pipeline

### Reliability

- [ ] Health checks configured for all services
- [ ] Auto-scaling policies based on CPU/memory metrics
- [ ] Database backups automated with tested restore procedures
- [ ] Multi-region deployment for disaster recovery
- [ ] Circuit breakers and retry policies implemented
- [ ] Graceful shutdown handling in all services

### Monitoring

- [ ] Application metrics collection (Prometheus)
- [ ] Log aggregation and analysis (ELK stack or cloud logging)
- [ ] Distributed tracing for request flow (Jaeger/Zipkin)
- [ ] Alerting rules configured for critical metrics
- [ ] On-call rotation and incident response procedures
- [ ] Performance monitoring and SLA tracking

### Performance

- [ ] Load testing completed for expected traffic
- [ ] Database query optimization and indexing
- [ ] CDN configured for static assets
- [ ] Caching strategy implemented at multiple layers
- [ ] Resource limits and requests tuned
- [ ] Network latency optimization

This deployment guide provides a comprehensive foundation for running The
Project in any environment, from local development to production at scale.
