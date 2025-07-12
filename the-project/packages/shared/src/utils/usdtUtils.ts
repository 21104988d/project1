// Utility functions for USDT operations
import { USDTQuoteRequest, USDTValidationResult, USDTChainConfig } from '../types/usdt';
import { isValidEthereumAddress } from './validators';

export function validateUSDTQuoteRequest(
  req: USDTQuoteRequest,
  chainConfigs: USDTChainConfig[]
): USDTValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const fromChain = chainConfigs.find(c => c.chainId === req.fromChainId);
  const toChain = chainConfigs.find(c => c.chainId === req.toChainId);

  if (!fromChain) errors.push('Unsupported fromChainId');
  if (!toChain) errors.push('Unsupported toChainId');

  if (!isValidEthereumAddress(req.fromAddress)) errors.push('Invalid fromAddress');
  if (!isValidEthereumAddress(req.toAddress)) errors.push('Invalid toAddress');

  if (!req.amount || isNaN(Number(req.amount)) || Number(req.amount) <= 0)
    errors.push('Invalid amount');
  if (fromChain && Number(req.amount) < Number(fromChain.minAmount))
    errors.push('Amount below minimum');
  if (fromChain && Number(req.amount) > Number(fromChain.maxAmount))
    errors.push('Amount above maximum');

  if (req.slippage < 0 || req.slippage > 5) errors.push('Slippage out of range (0-5%)');

  const result: USDTValidationResult = {
    isValid: errors.length === 0,
  };

  if (errors.length > 0) {
    result.errors = errors;
  }

  if (warnings.length > 0) {
    result.warnings = warnings;
  }

  return result;
}

export function getUSDTChainConfig(
  chainId: number,
  configs: USDTChainConfig[]
): USDTChainConfig | undefined {
  return configs.find(c => c.chainId === chainId);
}
