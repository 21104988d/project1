# Development Guide

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Docker (optional)
- Git

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd the-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development environment**
   ```bash
   npm run dev
   ```

## Project Structure

### Monorepo Architecture

The project uses NX monorepo architecture with the following packages:

- **`packages/frontend/`** - React TypeScript application
- **`packages/api/`** - Node.js Express API server
- **`packages/contracts/`** - Solidity smart contracts
- **`packages/routing-engine/`** - Route optimization engine
- **`packages/shared/`** - Shared utilities and types

### Development Workflow

#### 1. Frontend Development

```bash
# Start frontend dev server
npm run dev -w frontend

# Run frontend tests
npm run test -w frontend

# Build frontend
npm run build -w frontend
```

#### 2. API Development

```bash
# Start API server
npm run dev -w api

# Run API tests
npm run test -w api

# Generate API documentation
npm run docs:api -w api
```

#### 3. Smart Contract Development

```bash
# Compile contracts
npm run build -w contracts

# Run contract tests
npm run test -w contracts

# Deploy to local network
npm run deploy -w contracts

# Generate contract documentation
npm run docs -w contracts
```

#### 4. Routing Engine Development

```bash
# Start routing engine
npm run dev -w routing-engine

# Run engine tests
npm run test -w routing-engine
```

## Code Quality

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Pre-commit Hooks

The project uses Husky and lint-staged for pre-commit hooks:

- Lints staged files
- Formats code
- Runs type checking
- Runs spell checking

## Database Development

### Local Database Setup

```bash
# Start PostgreSQL and Redis with Docker
docker-compose up -d db redis

# Run migrations
npm run migrate

# Seed development data
npm run seed
```

### Schema Changes

```bash
# Create new migration
npm run migration:create

# Run pending migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback
```

## Environment Configuration

### Environment Variables

Create `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/theproject_dev"
REDIS_URL="redis://localhost:6379"

# Blockchain Networks
ETHEREUM_RPC_URL=""
ARBITRUM_RPC_URL=""
POLYGON_RPC_URL=""

# API Keys
ETHERSCAN_API_KEY=""
POLYGONSCAN_API_KEY=""
ARBISCAN_API_KEY=""

# Security
JWT_SECRET=""
API_KEY=""
```

## Development Commands

### Workspace Commands

```bash
# Install dependencies for all packages
npm install

# Build all packages
npm run build

# Run all tests
npm run test

# Start development servers
npm run dev

# Clean all build artifacts
npm run clean
```

### Package-specific Commands

```bash
# Run command in specific workspace
npm run <command> -w <package-name>

# Example: start frontend dev server
npm run dev -w frontend
```

## Debugging

### Frontend Debugging

- Use React DevTools browser extension
- Enable source maps in development
- Use browser developer tools

### API Debugging

- Use VS Code debugger with Node.js
- Enable debug logging with `DEBUG=*`
- Use Postman for API testing

### Contract Debugging

- Use Hardhat console for interaction
- Enable Hardhat network for local testing
- Use Remix IDE for contract development

## Performance Optimization

### Frontend Performance

- Use React.memo for component optimization
- Implement code splitting with React.lazy
- Optimize bundle size with webpack analyzer

### API Performance

- Use Redis for caching
- Implement database query optimization
- Monitor API response times

### Contract Gas Optimization

- Use Solidity optimizer
- Analyze gas usage with hardhat-gas-reporter
- Optimize contract storage patterns

## Troubleshooting

### Common Issues

1. **Node modules issues**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript compilation errors**

   ```bash
   npm run typecheck
   ```

3. **Database connection issues**

   ```bash
   docker-compose restart db
   ```

4. **Contract compilation issues**
   ```bash
   npm run clean -w contracts
   npm run build -w contracts
   ```

## Best Practices

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Write comprehensive JSDoc comments
- Use meaningful variable and function names

### Git Workflow

- Create feature branches from main
- Write descriptive commit messages
- Use conventional commit format
- Squash commits before merging

### Testing

- Write unit tests for all business logic
- Use integration tests for API endpoints
- Implement E2E tests for critical user flows
- Maintain test coverage above 80%

### Security

- Never commit secrets or private keys
- Use environment variables for configuration
- Validate all user inputs
- Follow smart contract security best practices

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Hardhat Documentation](https://hardhat.org/docs/)
- [NX Documentation](https://nx.dev/getting-started/intro)
