/**
 * @fileoverview Utility functions for formatting values in the cross-chain DApp router
 * @module formatters
 * @version 1.0.0
 * @author The Project Team
 * @since 1.0.0
 */

import { ethers } from 'ethers';

/**
 * Format token amount with proper decimal places and localization
 * @param amount - The raw token amount (can be BigNumber, string, or number)
 * @param decimals - Number of decimal places for the token (default: 18)
 * @param precision - Number of decimal places to display (default: 2)
 * @returns Formatted token amount as a localized string
 * @example
 * ```typescript
 * formatTokenAmount('1000000000000000000', 18, 2) // "1.00"
 * formatTokenAmount(1500000, 6, 2) // "1.50"
 * ```
 */
export function formatTokenAmount(
  amount: ethers.BigNumberish | string | number,
  decimals = 18,
  precision = 2
): string {
  try {
    // Handle string numbers that are too large for Number
    if (typeof amount === 'string' && amount.length > 15) {
      const bn = ethers.getBigInt(amount);
      const divisor = 10n ** BigInt(decimals);
      const wholePart = bn / divisor;
      const fractionalPart = bn % divisor;

      if (fractionalPart === 0n) {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }).format(Number(wholePart));
      }

      // Calculate fractional digits
      const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
      const truncatedFractional = fractionalStr.slice(0, precision);
      const value = parseFloat(`${wholePart}.${truncatedFractional}`);

      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(value);
    }

    const bn = ethers.getBigInt(amount);
    const divisor = 10n ** BigInt(decimals);
    const value = Number(bn) / Number(divisor);

    // Format with commas and fixed decimal places
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(value);
  } catch {
    return '0.00';
  }
}

/**
 * Format currency value with proper decimal places and currency symbol
 */
export function formatCurrency(
  amount: number | string,
  currency = 'USD',
  locale = 'en-US'
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(num);
}

/**
 * Format percentage with proper precision
 */
export function formatPercentage(value: number, precision = 2): string {
  return `${(value * 100).toFixed(precision)}%`;
}

/**
 * Format gas price in Gwei
 */
export function formatGasPrice(gasPriceWei: ethers.BigNumberish | string): string {
  const bn = ethers.getBigInt(gasPriceWei);
  const gwei = bn / 10n ** 9n;
  return `${gwei.toString()} Gwei`;
}

/**
 * Format transaction hash for display (truncated)
 */
export function formatTxHash(hash: string, length = 8): string {
  if (hash.length <= length * 2 + 2) {
    return hash;
  }
  return `${hash.slice(0, length + 2)}...${hash.slice(-length)}`;
}

/**
 * Format wallet address for display (truncated)
 */
export function formatAddress(address: string, length = 6): string {
  if (address.length <= length * 2 + 2) {
    return address;
  }
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

/**
 * Format time duration in human readable format
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format price impact with color coding hint
 */
export function formatPriceImpact(impact: number): {
  formatted: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
} {
  const formatted = formatPercentage(Math.abs(impact), 3);

  let severity: 'low' | 'medium' | 'high' | 'critical';
  const absImpact = Math.abs(impact);

  if (absImpact < 0.01) {
    severity = 'low';
  } else if (absImpact < 0.05) {
    severity = 'medium';
  } else if (absImpact < 0.15) {
    severity = 'high';
  } else {
    severity = 'critical';
  }

  return { formatted, severity };
}

/**
 * Format route path for display
 */
export function formatRoutePath(tokenSymbols: string[], chainNames: string[]): string {
  if (tokenSymbols.length !== chainNames.length) {
    throw new Error('Token symbols and chain names arrays must have the same length');
  }

  // eslint-disable-next-line security/detect-object-injection
  return tokenSymbols.map((symbol, index) => `${symbol}@${chainNames[index]}`).join(' → ');
}

/**
 * Format number with compact notation (K, M, B)
 */
export function formatCompactNumber(num: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
}

/**
 * Format USD value with dollar sign and commas
 */
export function formatUSDValue(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format time estimate in human readable format
 */
export function formatTimeEstimate(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (seconds < 3600) {
    const minutes = Math.round(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.round(seconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
}

/**
 * Truncate address for display (similar to formatAddress but with different naming)
 */
export function truncateAddress(address: string, length = 4): string {
  if (address.length <= length * 2 + 3) return address;
  return `${address.slice(0, length + 1)}...${address.slice(-length)}`;
}
