# API Reference

The Project provides a comprehensive REST API for cross-chain stablecoin routing
and arbitrage operations. This API is designed with a stablecoin-first approach,
focusing on USDT and USDC trading pairs.

## Base URL

```
Production: https://api.theproject.com
Development: http://localhost:3001
```

## Authentication

Most API endpoints require authentication using API keys. Include your API key
in the request headers:

```http
X-API-Key: your_api_key_here
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Free Tier**: 100 requests per 15 minutes
- **Pro Tier**: 1,000 requests per 15 minutes
- **Enterprise**: Custom limits

Rate limit information is included in response headers:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-07-01T12:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Token address is not valid",
    "details": { ... }
  },
  "timestamp": "2025-07-01T12:00:00.000Z"
}
```

## Core Endpoints

### 📊 [Quotes](/api/quotes)

Get real-time quotes for cross-chain stablecoin swaps

- `POST /api/v1/quote` - Request swap quote
- `GET /api/v1/quote/{id}` - Get quote by ID

### 🛣️ [Routes](/api/routes)

Find optimal routing paths for cross-chain transactions

- `POST /api/v1/route` - Find optimal route
- `GET /api/v1/routes/alternatives` - Get alternative routes

### ⚡ [Execute](/api/execute)

Execute cross-chain swap transactions

- `POST /api/v1/execute` - Execute swap transaction
- `POST /api/v1/execute/simulate` - Simulate transaction

### 📈 [Status](/api/status)

Track transaction status and progress

- `GET /api/v1/status/{transactionId}` - Get transaction status
- `GET /api/v1/status/history` - Get transaction history

### 🪙 [Tokens](/api/tokens)

Manage supported tokens and metadata

- `GET /api/v1/tokens` - List supported tokens
- `GET /api/v1/tokens/{address}` - Get token details

### ⛓️ [Chains](/api/chains)

Information about supported blockchain networks

- `GET /api/v1/chains` - List supported chains
- `GET /api/v1/chains/{chainId}` - Get chain details

## WebSocket API

Real-time updates are available via WebSocket connection:

```javascript
const ws = new WebSocket('wss://api.theproject.com/ws');

ws.onmessage = event => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

### Events

- `price_update` - Real-time price updates
- `route_update` - Route optimization updates
- `transaction_update` - Transaction status changes

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @theproject/sdk
```

```javascript
import { TheProjectSDK } from '@theproject/sdk';

const sdk = new TheProjectSDK({
  apiKey: 'your_api_key',
  environment: 'production',
});

const quote = await sdk.getQuote({
  tokenIn: 'USDT',
  tokenOut: 'USDC',
  amountIn: '1000',
  chainIdIn: 1,
  chainIdOut: 42161,
});
```

### Python

```bash
pip install theproject-python
```

```python
from theproject import TheProjectClient

client = TheProjectClient(api_key='your_api_key')

quote = client.get_quote(
    token_in='USDT',
    token_out='USDC',
    amount_in='1000',
    chain_id_in=1,
    chain_id_out=42161
)
```

## Error Codes

Common error codes and their meanings:

| Code                     | Description                         |
| ------------------------ | ----------------------------------- |
| `INVALID_TOKEN`          | Token address is not valid          |
| `INVALID_CHAIN`          | Chain ID is not supported           |
| `INSUFFICIENT_LIQUIDITY` | Not enough liquidity for trade size |
| `SLIPPAGE_TOO_HIGH`      | Price impact exceeds tolerance      |
| `DEADLINE_EXCEEDED`      | Transaction deadline has passed     |
| `RATE_LIMITED`           | API rate limit exceeded             |
| `UNAUTHORIZED`           | Invalid or missing API key          |
| `BRIDGE_ERROR`           | Cross-chain bridge error            |

## Best Practices

1. **Cache Responses**: Cache token and chain data to reduce API calls
2. **Handle Rate Limits**: Implement exponential backoff for rate limit errors
3. **Use WebSockets**: Subscribe to real-time updates for better UX
4. **Validate Inputs**: Validate all inputs client-side before API calls
5. **Handle Errors**: Implement proper error handling and user feedback
6. **Monitor Usage**: Track your API usage to avoid hitting limits

## Interactive API Explorer

Try out the API endpoints using our interactive documentation:

- [Swagger UI](/api/swagger) - Full API documentation with live testing
- [Postman Collection](/api/postman) - Import into Postman for testing
