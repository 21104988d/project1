import { Router, Request, Response } from 'express';
import { USDTPriceFeedService } from '../services/USDTPriceFeedService';
import { USDTRoutingEngine } from '../services/USDTRoutingEngine';
import { USDTValidationService } from '../services/USDTValidationService';

const router = Router();

/**
 * @swagger
 * /api/v1/quotes:
 *   post:
 *     summary: Get a quote for token swap
 *     tags: [Quotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromToken:
 *                 type: string
 *               toToken:
 *                 type: string
 *               amount:
 *                 type: string
 *               fromChain:
 *                 type: string
 *               toChain:
 *                 type: string
 *               slippage:
 *                 type: number
 *                 default: 0.5
 *     responses:
 *       200:
 *         description: Quote details
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { fromToken, toToken, amount, fromChain, toChain, slippage = 0.5 } = req.body;

    // Validate input
    const validation = USDTValidationService.validateQuoteRequest({
      fromToken,
      toToken,
      amount,
      fromChain,
      toChain,
      slippage,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    // Get quote from routing engine
    const routingEngine = new USDTRoutingEngine();
    const quote = await routingEngine.calculateOptimalRoute({
      fromToken,
      toToken,
      amount,
      fromChain,
      toChain,
      slippage,
      userAddress: req.body.userAddress,
    });

    res.json({
      success: true,
      data: quote,
    });
    return;
  } catch (error) {
    console.error('Quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get quote',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/v1/quotes/fast:
 *   post:
 *     summary: Get a fast quote (cached/estimated)
 *     tags: [Quotes]
 */
router.post('/fast', async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();
    const { fromToken, toToken, amount, fromChain, toChain } = req.body;

    const priceFeedService = new USDTPriceFeedService();
    const estimate = await priceFeedService.getFastQuote(
      fromToken,
      toToken,
      amount,
      fromChain,
      toChain
    );

    const responseTime = Date.now() - startTime;

    res.json({
      success: true,
      data: estimate,
      responseTime,
      cached: true,
    });
  } catch (error) {
    console.error('Fast quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get fast quote',
    });
  }
});

export default router;
