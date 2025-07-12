# Multi-stage Docker build for routing engine
FROM node:18-alpine AS base

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3002
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S routing-engine -u 1001

# Copy built application
COPY --from=build --chown=routing-engine:nodejs /app/dist ./dist
COPY --from=build --chown=routing-engine:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=routing-engine:nodejs /app/package*.json ./

# Switch to non-root user
USER routing-engine

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node dist/health-check.js || exit 1

EXPOSE 3002
CMD ["node", "dist/index.js"]
