// USDT validation schemas (for use with Zod or Joi if needed)
import { z } from 'zod';

export const USDTQuoteRequestSchema = z.object({
  fromChainId: z.number().int().positive(),
  toChainId: z.number().int().positive(),
  fromAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  toAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  // eslint-disable-next-line security/detect-unsafe-regex
  amount: z.string().refine(val => /^\d{1,10}(?:\.\d{1,6})?$/.test(val), {
    message: 'Invalid amount format',
  }),
  slippage: z.number().min(0).max(5),
  deadline: z.number().optional(),
});

export const USDTValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
});
