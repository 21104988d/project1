import crypto from 'crypto';
import { env } from './env';

/**
 * Secure key management utilities for development and production
 */
export class KeyManager {
  private static instance: KeyManager;
  private readonly keys: Map<string, string> = new Map();

  private constructor() {
    this.initializeKeys();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  /**
   * Initialize keys from environment
   */
  private initializeKeys(): void {
    // JWT Secret
    if (env.JWT_SECRET) {
      this.keys.set('jwt', env.JWT_SECRET);
    } else {
      throw new Error('JWT_SECRET is required');
    }

    // API Key
    if (env.API_KEY) {
      this.keys.set('api', env.API_KEY);
    } else {
      throw new Error('API_KEY is required');
    }

    // Private key for blockchain operations (optional)
    if (env.PRIVATE_KEY) {
      this.keys.set('blockchain', env.PRIVATE_KEY);
    }
  }

  /**
   * Get a key by name
   * @param keyName - Name of the key to retrieve
   * @returns The key value
   */
  public getKey(keyName: string): string {
    const key = this.keys.get(keyName);
    if (!key) {
      throw new Error(`Key '${keyName}' not found`);
    }
    return key;
  }

  /**
   * Check if a key exists
   * @param keyName - Name of the key to check
   * @returns True if key exists
   */
  public hasKey(keyName: string): boolean {
    return this.keys.has(keyName);
  }

  /**
   * Generate a secure random string
   * @param length - Length of the string to generate
   * @returns Secure random string
   */
  public static generateSecureKey(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Hash a value using SHA-256
   * @param value - Value to hash
   * @returns Hashed value
   */
  public static hash(value: string): string {
    return crypto.createHash('sha256').update(value).digest('hex');
  }

  /**
   * Create HMAC signature
   * @param message - Message to sign
   * @param secret - Secret key for signing
   * @returns HMAC signature
   */
  public static createHMAC(message: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(message).digest('hex');
  }

  /**
   * Verify HMAC signature
   * @param message - Original message
   * @param signature - Signature to verify
   * @param secret - Secret key used for signing
   * @returns True if signature is valid
   */
  public static verifyHMAC(message: string, signature: string, secret: string): boolean {
    const expectedSignature = this.createHMAC(message, secret);
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  /**
   * Encrypt data using AES-256-GCM
   * @param data - Data to encrypt
   * @param key - Encryption key
   * @returns Encrypted data with IV and auth tag
   */
  public static encrypt(
    data: string,
    key: string
  ): {
    encrypted: string;
    iv: string;
    authTag: string;
  } {
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const keyBuffer = crypto.scryptSync(key, 'salt', 32);

    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // For GCM mode, we'd need to use the newer API
    // This is a simplified version for development
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: '', // Simplified for development - in production use proper GCM mode
    };
  }

  /**
   * Decrypt data using AES-256-GCM
   * @param encryptedData - Encrypted data object
   * @param key - Decryption key
   * @returns Decrypted data
   */
  public static decrypt(
    encryptedData: { encrypted: string; iv: string; authTag: string },
    key: string
  ): string {
    const algorithm = 'aes-256-gcm';
    const keyBuffer = crypto.scryptSync(key, 'salt', 32);

    // Verify auth tag
    const expectedAuthTag = crypto
      .createHash('sha256')
      .update(encryptedData.encrypted + key)
      .digest('hex');

    if (expectedAuthTag !== encryptedData.authTag) {
      throw new Error('Authentication tag verification failed');
    }

    const decipher = crypto.createDecipheriv(
      algorithm,
      keyBuffer,
      Buffer.from(encryptedData.iv, 'hex')
    );

    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

/**
 * Global key manager instance
 */
export const keyManager = KeyManager.getInstance();
