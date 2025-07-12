// packages/shared/src/__tests__/formatters.test.ts
// Unit tests for utility formatters

import { describe, it, expect } from '@jest/globals';
import {
  formatTokenAmount,
  formatUSDValue,
  formatPercentage,
  formatTimeEstimate,
  truncateAddress,
} from '../utils/formatters';

describe('formatters', () => {
  describe('formatTokenAmount', () => {
    it('should format large numbers with commas', () => {
      // 1000000 * 10^18 = large number in smallest units
      expect(formatTokenAmount('1000000000000000000000000', 18)).toBe('1,000,000.00');
    });

    it('should handle different decimal places', () => {
      expect(formatTokenAmount('1000000000000000000', 18)).toBe('1.00');
      expect(formatTokenAmount('1500000000000000000', 18)).toBe('1.50');
    });

    it('should handle USDT with 6 decimals', () => {
      expect(formatTokenAmount('1000000', 6)).toBe('1.00');
      expect(formatTokenAmount('1500000', 6)).toBe('1.50');
    });
  });

  describe('formatUSDValue', () => {
    it('should format USD values with dollar sign', () => {
      expect(formatUSDValue(1234.56)).toBe('$1,234.56');
      expect(formatUSDValue(0.01)).toBe('$0.01');
    });

    it('should handle large values', () => {
      expect(formatUSDValue(1000000)).toBe('$1,000,000.00');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(0.1234)).toBe('12.34%');
      expect(formatPercentage(0.001)).toBe('0.10%');
    });
  });

  describe('formatTimeEstimate', () => {
    it('should format time estimates', () => {
      expect(formatTimeEstimate(30)).toBe('30 seconds');
      expect(formatTimeEstimate(120)).toBe('2 minutes');
      expect(formatTimeEstimate(3600)).toBe('1 hour');
    });
  });

  describe('truncateAddress', () => {
    it('should truncate Ethereum addresses', () => {
      const address = '0x742d35Cc6634C0532925a3b8D8FD0E4c';
      expect(truncateAddress(address)).toBe('0x742...0E4c');
    });

    it('should truncate Solana addresses', () => {
      const address = 'DhzK9o8fcfZ6K3eaZj5QQ8KZgCGHK8XJT9J9KdJH8E8E';
      expect(truncateAddress(address)).toBe('DhzK9...8E8E');
    });
  });
});
