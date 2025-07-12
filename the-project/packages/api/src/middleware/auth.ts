import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keyManager } from '../config/keys';
import { env } from '../config/env';

/**
 * Extended Request interface with user information
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    permissions: string[];
  };
}

/**
 * User roles and their permissions
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  READONLY = 'readonly',
}

/**
 * Available permissions
 */
export enum Permission {
  READ_QUOTES = 'read:quotes',
  WRITE_QUOTES = 'write:quotes',
  READ_TRANSACTIONS = 'read:transactions',
  WRITE_TRANSACTIONS = 'write:transactions',
  READ_ADMIN = 'read:admin',
  WRITE_ADMIN = 'write:admin',
}

/**
 * Role-based permissions mapping
 */
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.READ_QUOTES,
    Permission.WRITE_QUOTES,
    Permission.READ_TRANSACTIONS,
    Permission.WRITE_TRANSACTIONS,
    Permission.READ_ADMIN,
    Permission.WRITE_ADMIN,
  ],
  [UserRole.USER]: [
    Permission.READ_QUOTES,
    Permission.WRITE_QUOTES,
    Permission.READ_TRANSACTIONS,
    Permission.WRITE_TRANSACTIONS,
  ],
  [UserRole.READONLY]: [Permission.READ_QUOTES, Permission.READ_TRANSACTIONS],
};

/**
 * Generate JWT token for user
 * @param userId - User ID
 * @param role - User role
 * @returns JWT token
 */
export function generateToken(userId: string, role: UserRole): string {
  const payload = {
    id: userId,
    role,
    permissions: ROLE_PERMISSIONS[role],
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
  };

  return jwt.sign(payload, keyManager.getKey('jwt'));
}

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, keyManager.getKey('jwt'));
  } catch {
    throw new Error('Invalid token');
  }
}

/**
 * Authentication middleware
 * Verifies JWT token in Authorization header
 */
export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authorization header required' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      permissions: decoded.permissions || [],
    };

    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * API Key authentication middleware
 * For service-to-service communication
 */
export function authenticateApiKey(req: Request, res: Response, next: NextFunction): void {
  try {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      res.status(401).json({ error: 'API key required' });
      return;
    }

    if (apiKey !== keyManager.getKey('api')) {
      res.status(401).json({ error: 'Invalid API key' });
      return;
    }

    next();
  } catch {
    res.status(401).json({ error: 'API key authentication failed' });
  }
}

/**
 * Authorization middleware factory
 * Checks if user has required permissions
 * @param requiredPermissions - Permissions required to access the route
 * @returns Express middleware function
 */
export function authorize(requiredPermissions: Permission[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const userPermissions = req.user.permissions || [];
      const hasPermission = requiredPermissions.every(permission =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        res.status(403).json({
          error: 'Insufficient permissions',
          required: requiredPermissions,
          user_permissions: userPermissions,
        });
        return;
      }

      next();
    } catch {
      res.status(403).json({ error: 'Authorization failed' });
    }
  };
}

/**
 * Development-only middleware for testing authentication
 */
export function developmentAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  if (env.NODE_ENV === 'development') {
    // In development, allow requests without authentication
    // but log a warning
    console.warn('🚧 Development mode: Skipping authentication');
    req.user = {
      id: 'dev-user',
      role: UserRole.ADMIN,
      permissions: ROLE_PERMISSIONS[UserRole.ADMIN],
    };
  }
  next();
}

// Legacy middleware for backward compatibility
export const authMiddleware = authenticate;
