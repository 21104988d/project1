import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('API Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  // Default error response
  let statusCode = 500;
  let errorResponse = {
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'unknown',
  };

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    errorResponse = {
      error: 'Validation Error',
      message: error.message,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown',
    };
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    errorResponse = {
      error: 'Unauthorized',
      message: 'Authentication required',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown',
    };
  } else if (error.name === 'ForbiddenError') {
    statusCode = 403;
    errorResponse = {
      error: 'Forbidden',
      message: 'Insufficient permissions',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown',
    };
  } else if (error.name === 'NotFoundError') {
    statusCode = 404;
    errorResponse = {
      error: 'Not Found',
      message: error.message || 'Resource not found',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown',
    };
  }

  // Don't expose stack traces in production
  if (process.env.NODE_ENV === 'development' && error.stack) {
    (errorResponse as { stack?: string }).stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};
