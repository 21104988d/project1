# Tests Directory

This directory contains integration and end-to-end tests for The Project.

## Structure

```
tests/
├── integration/           # Integration tests
│   ├── setup.ts          # Test setup and database seeding
│   ├── api.test.ts       # API endpoint tests
│   └── routing-engine.test.ts # Routing engine tests
├── e2e/                  # End-to-end tests
│   ├── playwright.config.ts # Playwright configuration
│   └── specs/            # E2E test specifications
│       └── swap-flow.spec.ts # Complete swap flow tests
├── jest.config.js        # Jest configuration for integration tests
└── vitest.config.ts      # Vitest configuration (alternative)
```

## Running Tests

### Integration Tests (Jest)

```bash
# Run all integration tests
npm run test:integration

# Run specific test file
npm run test:integration api.test.ts

# Run with coverage
npm run test:integration -- --coverage
```

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific test
npm run test:e2e -- swap-flow.spec.ts
```

### All Tests

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch
```

## Test Environment

The tests use the following environment:

- **Database**: PostgreSQL test database
- **Cache**: Redis test instance
- **Frontend**: Local development server on port 3000
- **API**: Local API server on port 3001

## Test Data

Integration tests automatically:

1. Clean the database before each test suite
2. Seed with test token data (USDT/USDC on Ethereum/Arbitrum)
3. Clear Redis cache between tests
4. Restore clean state after each test

## Mock Data

E2E tests use mocked:

- Wallet connections (MetaMask simulation)
- Blockchain interactions
- Transaction confirmations
- Price feed data

## Coverage Reports

Test coverage reports are generated in:

- `./coverage/` - HTML coverage reports
- Console output for quick overview

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up resources after tests
3. **Assertions**: Use descriptive assertions with proper error messages
4. **Performance**: Keep test execution time reasonable
5. **Documentation**: Comment complex test scenarios
