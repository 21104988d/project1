# API Service Dockerfile
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY packages/api ./packages/api
COPY packages/shared ./packages/shared

# Build the application
RUN npm run build -w packages/api

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S theproject -u 1001

# Copy built application
COPY --from=base --chown=theproject:nodejs /app/packages/api/dist ./dist
COPY --from=base --chown=theproject:nodejs /app/packages/api/package*.json ./
COPY --from=base --chown=theproject:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER theproject

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["npm", "start"]
