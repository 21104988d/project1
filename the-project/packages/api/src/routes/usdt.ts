import { Router, Request, Response } from 'express';
import { USDTRoutingEngine } from '../services/USDTRoutingEngine';
import { USDTPriceFeedService } from '../services/USDTPriceFeedService';
import { USDTValidationService } from '../services/USDTValidationService';
import { cacheMiddleware } from '../middleware/cache';
import { validateUSDTQuote } from '../middleware/validation';
// import { validateUSDTSwap } from '../middleware/validation'; // TODO: Implement swap validation

const router = Router();
const routingEngine = new USDTRoutingEngine();
const priceFeedService = new USDTPriceFeedService();
const validationService = new USDTValidationService();

/**
 * @swagger
 * /api/v1/usdt/quote:
 *   post:
 *     summary: Get USDT cross-chain quote
 *     description: Get an optimized quote for USDT cross-chain transfer
 *     tags: [USDT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromChain
 *               - toChain
 *               - amount
 *             properties:
 *               fromChain:
 *                 type: string
 *                 enum: [ethereum, arbitrum, polygon, bsc, solana]
 *                 example: ethereum
 *               toChain:
 *                 type: string
 *                 enum: [ethereum, arbitrum, polygon, bsc, solana]
 *                 example: arbitrum
 *               amount:
 *                 type: string
 *                 example: "1000.50"
 *               slippageTolerance:
 *                 type: number
 *                 minimum: 0.01
 *                 maximum: 5.0
 *                 example: 0.1
 *     responses:
 *       200:
 *         description: USDT quote successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quote:
 *                   type: object
 *                   properties:
 *                     outputAmount:
 *                       type: string
 *                       example: "999.85"
 *                     estimatedTime:
 *                       type: string
 *                       example: "2-3 minutes"
 *                     fees:
 *                       type: object
 *                       properties:
 *                         bridge:
 *                           type: string
 *                           example: "0.10"
 *                         service:
 *                           type: string
 *                           example: "0.05"
 *                         gas:
 *                           type: string
 *                           example: "0.002"
 *                     route:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           protocol:
 *                             type: string
 *                           action:
 *                             type: string
 *                           amount:
 *                             type: string
 *                     slippage:
 *                       type: string
 *                       example: "0.1"
 *                     validUntil:
 *                       type: string
 *                       format: date-time
 */
router.post(
  '/quote',
  validateUSDTQuote,
  cacheMiddleware(30),
  async (req: Request, res: Response) => {
    try {
      const { fromChain, toChain, amount, slippageTolerance = 0.1 } = req.body;

      // Validate USDT amount and chains
      const validation = await validationService.validateQuoteRequest({
        fromChain,
        toChain,
        amount,
        slippageTolerance,
      });

      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Validation Error',
          message: validation.error,
          timestamp: new Date().toISOString(),
        });
      }

      // Get optimized USDT route
      const quote = await routingEngine.getOptimalRoute({
        fromChain,
        toChain,
        amount,
        slippageTolerance,
        tokenSymbol: 'USDT',
      });

      // Get current USDT prices for transparency
      const prices = await priceFeedService.getUSDTPrices([fromChain, toChain]);

      res.json({
        quote: {
          ...quote,
          prices,
          requestId: Date.now().toString(),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    } catch (error) {
      console.error('USDT Quote Error:', error);
      res.status(500).json({
        error: 'Quote Generation Failed',
        message: 'Unable to generate USDT quote at this time',
        timestamp: new Date().toISOString(),
      });
      return;
    }
  }
);

/**
 * @swagger
 * /api/v1/usdt/pools:
 *   get:
 *     summary: Get USDT liquidity pools
 *     description: Get available USDT liquidity pools across chains
 *     tags: [USDT]
 *     parameters:
 *       - in: query
 *         name: chain
 *         schema:
 *           type: string
 *           enum: [ethereum, arbitrum, polygon, bsc, solana]
 *         description: Filter by specific chain
 *     responses:
 *       200:
 *         description: USDT pools information
 */
router.get('/pools', cacheMiddleware(60), async (req: Request, res: Response) => {
  try {
    const { chain } = req.query;

    const pools = await routingEngine.getUSDTLiquidityPools(chain as string);

    res.json({
      pools,
      totalLiquidity: pools.reduce((sum, pool) => sum + parseFloat(pool.liquidity), 0),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('USDT Pools Error:', error);
    res.status(500).json({
      error: 'Pool Data Unavailable',
      message: 'Unable to fetch USDT pool information',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @swagger
 * /api/v1/usdt/rates:
 *   get:
 *     summary: Get real-time USDT rates
 *     description: Get current USDT exchange rates across all supported chains
 *     tags: [USDT]
 *     responses:
 *       200:
 *         description: Current USDT rates
 */
router.get('/rates', cacheMiddleware(10), async (_req: Request, res: Response) => {
  try {
    const rates = await priceFeedService.getAllUSDTRates();

    res.json({
      rates,
      lastUpdated: new Date().toISOString(),
      updateFrequency: '10 seconds',
    });
  } catch (error) {
    console.error('USDT Rates Error:', error);
    res.status(500).json({
      error: 'Rate Data Unavailable',
      message: 'Unable to fetch current USDT rates',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @swagger
 * /api/v1/usdt/bridges:
 *   get:
 *     summary: Get available USDT bridges
 *     description: Get status and information about USDT cross-chain bridges
 *     tags: [USDT]
 *     responses:
 *       200:
 *         description: Available USDT bridges
 */
router.get('/bridges', cacheMiddleware(120), async (_req: Request, res: Response) => {
  try {
    const bridges = await routingEngine.getAvailableBridges();

    res.json({
      bridges: bridges.filter(bridge => bridge.supportedTokens.includes('USDT')),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('USDT Bridges Error:', error);
    res.status(500).json({
      error: 'Bridge Data Unavailable',
      message: 'Unable to fetch USDT bridge information',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @swagger
 * /api/v1/usdt/analytics:
 *   get:
 *     summary: Get USDT analytics
 *     description: Get analytics data for USDT cross-chain activity
 *     tags: [USDT]
 *     parameters:
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [1h, 24h, 7d, 30d]
 *           default: 24h
 *         description: Time frame for analytics
 *     responses:
 *       200:
 *         description: USDT analytics data
 */
router.get('/analytics', cacheMiddleware(300), async (req: Request, res: Response) => {
  try {
    const { timeframe = '24h' } = req.query;

    const analytics = await routingEngine.getUSDTAnalytics(timeframe as string);

    res.json({
      analytics,
      timeframe,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('USDT Analytics Error:', error);
    res.status(500).json({
      error: 'Analytics Unavailable',
      message: 'Unable to fetch USDT analytics data',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
