export interface USDTValidationRequest {
  fromChain: string;
  toChain: string;
  amount: string;
  slippageTolerance: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
  errors?: string[];
}

export class USDTValidationService {
  private readonly supportedChains = ['ethereum', 'arbitrum', 'polygon', 'bsc', 'solana'];
  private readonly minAmount = 0.01; // Minimum USDT amount
  private readonly maxAmount = 1000000; // Maximum USDT amount
  private readonly maxSlippage = 5.0; // Maximum slippage percentage

  async validateQuoteRequest(request: USDTValidationRequest): Promise<ValidationResult> {
    const { fromChain, toChain, amount, slippageTolerance } = request;

    // Validate chains
    if (!this.supportedChains.includes(fromChain)) {
      return {
        isValid: false,
        error: `Unsupported source chain: ${fromChain}. Supported chains: ${this.supportedChains.join(', ')}`,
      };
    }

    if (!this.supportedChains.includes(toChain)) {
      return {
        isValid: false,
        error: `Unsupported destination chain: ${toChain}. Supported chains: ${this.supportedChains.join(', ')}`,
      };
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return {
        isValid: false,
        error: 'Amount must be a positive number',
      };
    }

    if (amountNum < this.minAmount) {
      return {
        isValid: false,
        error: `Amount too small. Minimum amount: ${this.minAmount} USDT`,
      };
    }

    if (amountNum > this.maxAmount) {
      return {
        isValid: false,
        error: `Amount too large. Maximum amount: ${this.maxAmount} USDT`,
      };
    }

    // Validate slippage tolerance
    if (slippageTolerance < 0.01 || slippageTolerance > this.maxSlippage) {
      return {
        isValid: false,
        error: `Slippage tolerance must be between 0.01% and ${this.maxSlippage}%`,
      };
    }

    // Generate warnings
    const warnings: string[] = [];

    if (amountNum > 50000) {
      warnings.push('Large amount detected. Transaction may experience higher slippage.');
    }

    if (slippageTolerance > 1.0) {
      warnings.push('High slippage tolerance. You may receive less than expected.');
    }

    if (fromChain === 'ethereum' && amountNum < 100) {
      warnings.push('Small amount on Ethereum. Gas fees may be relatively high.');
    }

    if (fromChain === 'solana' || toChain === 'solana') {
      warnings.push('Solana bridge may experience occasional delays during network congestion.');
    }

    return {
      isValid: true,
      ...(warnings.length > 0 && { warnings }),
    };
  }

  async validateSwapRequest(request: any): Promise<ValidationResult> {
    // Validate wallet address format
    if (!request.walletAddress) {
      return {
        isValid: false,
        error: 'Wallet address is required',
      };
    }

    // Validate signature
    if (!request.signature) {
      return {
        isValid: false,
        error: 'Transaction signature is required',
      };
    }

    // Validate quote expiry
    if (request.quoteExpiry && new Date(request.quoteExpiry) < new Date()) {
      return {
        isValid: false,
        error: 'Quote has expired. Please request a new quote.',
      };
    }

    // Additional swap-specific validations
    const quoteValidation = await this.validateQuoteRequest({
      fromChain: request.fromChain,
      toChain: request.toChain,
      amount: request.amount,
      slippageTolerance: request.slippageTolerance || 0.1,
    });

    return quoteValidation;
  }

  static validateQuoteRequest(request: any): { isValid: boolean; errors?: string[] } {
    const errors: string[] = [];

    // Validate required fields
    if (!request.fromToken) errors.push('fromToken is required');
    if (!request.toToken) errors.push('toToken is required');
    if (!request.amount) errors.push('amount is required');
    if (!request.fromChain) errors.push('fromChain is required');
    if (!request.toChain) errors.push('toChain is required');

    // Validate amount
    if (request.amount) {
      const amount = parseFloat(request.amount);
      if (isNaN(amount) || amount <= 0) {
        errors.push('amount must be a positive number');
      }
      if (amount < 0.01) {
        errors.push('amount must be at least 0.01');
      }
      if (amount > 1000000) {
        errors.push('amount must not exceed 1,000,000');
      }
    }

    // Validate slippage
    if (request.slippage !== undefined) {
      const slippage = parseFloat(request.slippage);
      if (isNaN(slippage) || slippage < 0 || slippage > 50) {
        errors.push('slippage must be between 0 and 50');
      }
    }

    return {
      isValid: errors.length === 0,
      ...(errors.length > 0 && { errors }),
    };
  }

  validateWalletAddress(address: string, chain: string): boolean {
    switch (chain) {
      case 'ethereum':
      case 'arbitrum':
      case 'polygon':
      case 'bsc':
        // EVM address validation
        return /^0x[a-fA-F0-9]{40}$/.test(address);

      case 'solana':
        // Solana address validation (base58, 32-44 characters)
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);

      default:
        return false;
    }
  }

  validateTransactionHash(hash: string, chain: string): boolean {
    switch (chain) {
      case 'ethereum':
      case 'arbitrum':
      case 'polygon':
      case 'bsc':
        // EVM transaction hash validation
        return /^0x[a-fA-F0-9]{64}$/.test(hash);

      case 'solana':
        // Solana transaction signature validation
        return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(hash);

      default:
        return false;
    }
  }

  async checkBridgeStatus(fromChain: string, toChain: string): Promise<ValidationResult> {
    // Simulate bridge status checks
    const bridgeStatuses = new Map([
      ['ethereum-arbitrum', true],
      ['arbitrum-ethereum', true],
      ['ethereum-polygon', true],
      ['polygon-ethereum', true],
      ['ethereum-bsc', true],
      ['bsc-ethereum', true],
      ['ethereum-solana', true],
      ['solana-ethereum', false], // Simulate maintenance
      ['arbitrum-polygon', true],
      ['polygon-arbitrum', true],
    ]);

    const routeKey = `${fromChain}-${toChain}`;
    const isActive = bridgeStatuses.get(routeKey) ?? false;

    if (!isActive) {
      return {
        isValid: false,
        error: `Bridge from ${fromChain} to ${toChain} is currently under maintenance. Please try again later.`,
      };
    }

    return { isValid: true };
  }

  async validateLiquidity(
    fromChain: string,
    toChain: string,
    amount: string
  ): Promise<ValidationResult> {
    const amountNum = parseFloat(amount);

    // Simulate liquidity checks
    const liquidityLimits = new Map([
      ['ethereum', 50000000],
      ['arbitrum', 10000000],
      ['polygon', 5000000],
      ['bsc', 8000000],
      ['solana', 3000000],
    ]);

    const fromLiquidity = liquidityLimits.get(fromChain) || 1000000;
    const toLiquidity = liquidityLimits.get(toChain) || 1000000;

    // Check if amount exceeds 10% of available liquidity
    const maxSafeAmount = Math.min(fromLiquidity, toLiquidity) * 0.1;

    if (amountNum > maxSafeAmount) {
      return {
        isValid: false,
        error: `Amount exceeds available liquidity. Maximum safe amount: ${maxSafeAmount.toLocaleString()} USDT`,
      };
    }

    // Generate warning for large amounts
    const warnings: string[] = [];
    const warningThreshold = maxSafeAmount * 0.5;

    if (amountNum > warningThreshold) {
      warnings.push(
        `Large amount relative to available liquidity. Consider splitting into smaller transactions.`
      );
    }

    return {
      isValid: true,
      ...(warnings.length > 0 && { warnings }),
    };
  }

  async validateGasPrices(chain: string): Promise<ValidationResult> {
    // Simulate gas price validation
    const gasLimits = new Map([
      ['ethereum', 200], // gwei
      ['arbitrum', 2],
      ['polygon', 100],
      ['bsc', 20],
      ['solana', 0.001], // SOL
    ]);

    const currentGasPrice = gasLimits.get(chain) || 50;
    const highGasThreshold = gasLimits.get(chain)! * 2;

    const warnings: string[] = [];

    if (currentGasPrice > highGasThreshold) {
      warnings.push(`High gas prices detected on ${chain}. Consider waiting for lower fees.`);
    }

    return {
      isValid: true,
      ...(warnings.length > 0 && { warnings }),
    };
  }

  sanitizeAmount(amount: string): string {
    // Remove any non-numeric characters except decimal point
    const cleaned = amount.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Limit decimal places to 6
    if (parts.length === 2 && parts[1].length > 6) {
      return `${parts[0]}.${parts[1].substring(0, 6)}`;
    }

    return cleaned;
  }

  formatValidationErrors(result: ValidationResult): string {
    if (result.isValid) {
      return '';
    }

    let message = result.error || 'Validation failed';

    if (result.warnings && result.warnings.length > 0) {
      message += `\n\nWarnings:\n${result.warnings.map(w => `• ${w}`).join('\n')}`;
    }

    return message;
  }
}
