import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /api/v1/tokens:
 *   get:
 *     summary: Get list of supported tokens
 *     tags: [Tokens]
 *     responses:
 *       200:
 *         description: List of supported tokens
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const supportedTokens = {
      ethereum: [
        {
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          symbol: 'USDT',
          name: 'Tether USD',
          decimals: 6,
          logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png',
        },
        {
          address: '0xA0b86a33E6441c6C5c3c28E6d5a1a40CDb3E2b0D',
          symbol: 'USDC',
          name: 'USD Coin',
          decimals: 6,
          logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
        },
      ],
      polygon: [
        {
          address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
          symbol: 'USDT',
          name: 'Tether USD',
          decimals: 6,
          logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png',
        },
      ],
      bsc: [
        {
          address: '0x55d398326f99059fF775485246999027B3197955',
          symbol: 'USDT',
          name: 'Tether USD',
          decimals: 18,
          logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png',
        },
      ],
    };

    res.json({
      success: true,
      data: supportedTokens,
    });
  } catch (error) {
    console.error('Tokens error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get supported tokens',
    });
  }
});

/**
 * @swagger
 * /api/v1/tokens/{chain}:
 *   get:
 *     summary: Get tokens for specific chain
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: chain
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:chain', async (_req: Request, res: Response) => {
  try {
    // This would typically come from a database or external API
    const tokenData = {
      // Implementation would fetch from database
    };

    res.json({
      success: true,
      data: tokenData,
    });
  } catch (error) {
    console.error('Chain tokens error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get chain tokens',
    });
  }
});

export default router;
