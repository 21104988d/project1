# Frontend Dockerfile
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/frontend ./packages/frontend
COPY packages/shared ./packages/shared

# Build the application
RUN npm run build -w packages/frontend

# Production stage with nginx
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx
RUN adduser -S theproject -u 1001 -G nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
