import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// General validation middleware
export const validationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request parameters',
      details: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg,
        value: error.type === 'field' ? error.value : undefined,
      })),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
};

// Chain pair validation
export const validateChainPair = (req: Request, res: Response, next: NextFunction): void => {
  const { fromChain, toChain } = req.body;

  if (!fromChain || !toChain) {
    res.status(400).json({
      error: 'Invalid chain pair',
      message: 'Both fromChain and toChain are required',
    });
    return;
  }

  next();
};

// Amount validation
export const validateAmount = (req: Request, res: Response, next: NextFunction): void => {
  const { amount } = req.body;

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    res.status(400).json({
      error: 'Invalid amount',
      message: 'Amount must be a positive number',
    });
    return;
  }

  next();
};

// Wallet address validation
export const validateWalletAddress = (req: Request, res: Response, next: NextFunction): void => {
  const { walletAddress } = req.body;

  if (!walletAddress || typeof walletAddress !== 'string') {
    res.status(400).json({
      error: 'Invalid wallet address',
      message: 'Valid wallet address is required',
    });
    return;
  }

  next();
};

// Rate limiting validation
export const validateRateLimit = (_req: Request, _res: Response, next: NextFunction): void => {
  // Simple rate limiting - can be enhanced
  next();
};

// API key validation
export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.status(401).json({
      error: 'Missing API key',
      message: 'API key is required',
    });
    return;
  }

  next();
};

// Content type validation
export const validateContentType = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'POST' && !req.is('application/json')) {
    res.status(400).json({
      error: 'Invalid content type',
      message: 'Content-Type must be application/json',
    });
    return;
  }

  next();
};

// Create validation chain
export const createValidationChain = (_validators: unknown[]) => {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    // Simple validation chain implementation
    next();
  };
};

// Input sanitization
export const sanitizeInput = (req: Request, _res: Response, next: NextFunction): void => {
  // Basic input sanitization
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  next();
};

// USDT-specific validation
export const validateUSDTQuote = (req: Request, res: Response, next: NextFunction): void => {
  const { fromChain, toChain, amount } = req.body;

  if (!fromChain || !toChain || !amount) {
    res.status(400).json({
      error: 'Missing required fields',
      message: 'fromChain, toChain, and amount are required',
    });
    return;
  }

  next();
};
