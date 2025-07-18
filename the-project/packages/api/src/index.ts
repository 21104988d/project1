/**
 * @fileoverview Main API server entry point for the cross-chain routing platform
 * @version 1.0.0
 * @author The Project Team
 */

import dotenv from 'dotenv';
import path from 'path';
const envPath = path.resolve(__dirname, '../.env');
console.log(`[dotenv] Loading .env from: ${envPath}`);
const result = dotenv.config({ path: envPath });
if (result.error) {
  throw new Error(`[dotenv] Failed to load .env from ${envPath}: ${result.error}`);
}
import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Import route handlers
import quoteRoutes from './routes/quotes';
import tokensRoutes from './routes/tokens';
import executeRoutes from './routes/execute';
import statusRoutes from './routes/status';
import usdtRoutes from './routes/usdt';

// Import middleware
import { rateLimitMiddleware } from './middleware/rateLimit';
// import { validationMiddleware } from './middleware/validation'; // TODO: Implement validation
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

// Import WebSocket handlers
import { setupWebSocketHandlers } from './websocket/priceUpdates';

// Import database and cache
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';

// Load environment variables
// (already loaded above)

const app: Express = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const PORT = env.API_PORT;
const API_VERSION = process.env.API_VERSION || 'v1';

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'USDT Bridge API',
      version: '1.0.0',
      description: 'API for USDT cross-chain bridge operations',
      contact: {
        name: 'The Project Team',
        email: 'api@theproject.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/${API_VERSION}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(rateLimitMiddleware);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    version: API_VERSION,
  });
});

// API documentation
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'USDT Bridge API Documentation',
  })
);

// API routes with version prefix
const apiRouter = express.Router();

// Apply authentication middleware to protected routes
apiRouter.use('/execute', authMiddleware);
apiRouter.use('/status', authMiddleware);

// Route handlers
apiRouter.use('/quotes', quoteRoutes);
apiRouter.use('/tokens', tokensRoutes);
apiRouter.use('/execute', executeRoutes);
apiRouter.use('/status', statusRoutes);
apiRouter.use('/usdt', usdtRoutes); // USDT-specific routes

app.use(`/api/${API_VERSION}`, apiRouter);

// WebSocket setup
setupWebSocketHandlers(io);

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    console.log('✅ Database connected');

    // Connect to Redis
    await connectRedis();
    console.log('✅ Redis connected');

    // Start HTTP server
    server.listen(PORT, () => {
      console.log(`🚀 USDT Bridge API Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
      console.log(`💡 Health Check: http://localhost:${PORT}/health`);
      console.log(`🔌 WebSocket: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Export for testing
export { app, server, io };

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}
