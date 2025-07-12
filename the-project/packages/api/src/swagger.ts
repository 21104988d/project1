/**
 * @fileoverview Swagger/OpenAPI documentation setup for the API
 * @module swagger
 * @version 1.0.0
 * @author The Project Team
 * @since 1.0.0
 */

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Swagger configuration options for OpenAPI 3.0.3
 */
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Cross-Chain DApp Router API',
      version: '1.0.0',
      description: `
        RESTful API for cross-chain token routing and arbitrage operations.
        
        ## Features
        - USDT cross-chain routing
        - Real-time quote generation
        - Transaction execution
        - WebSocket price updates
        
        ## Authentication
        This API uses API key authentication for certain endpoints.
      `,
      contact: {
        name: 'The Project Team',
        email: 'support@theproject.com',
        url: 'https://theproject.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://api.theproject.com'
            : 'http://localhost:3001',
        description:
          process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/middleware/*.ts'], // paths to files containing OpenAPI definitions
};

// Load OpenAPI spec from YAML file
const loadOpenAPISpec = (): any => {
  try {
    const yamlPath = path.join(__dirname, '../docs/openapi.yaml');
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    return yaml.load(yamlContent);
  } catch (error) {
    console.warn('Could not load OpenAPI YAML file, using JSDoc definitions instead:', error);
    return swaggerJSDoc(options);
  }
};

export const setupSwagger = (app: Express): void => {
  const specs = loadOpenAPISpec();

  // Swagger UI options
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: '/api-docs/swagger.json',
          name: 'Cross-Chain Router API',
        },
      ],
      docExpansion: 'list',
      filter: true,
      showRequestHeaders: true,
      tryItOutEnabled: true,
    },
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info hgroup.main h2 { color: #3b82f6; }
    `,
    customSiteTitle: 'Cross-Chain Router API Documentation',
  };

  // Serve swagger.json
  app.get('/api-docs/swagger.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

  // Health check for documentation
  app.get('/api-docs/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      documentation: {
        swagger: '/api-docs',
        openapi: '/api-docs/swagger.json',
      },
    });
  });

  console.log(`📚 API Documentation available at: /api-docs`);
  console.log(`📋 OpenAPI JSON available at: /api-docs/swagger.json`);
};

export default setupSwagger;
