# NPM Warning Cleanup Strategy

## Current Issues Analysis

### 1. Deprecated Packages (Informational Warnings)
- `inflight@1.0.6` - Suggested replacement: `lru-cache`
- `glob@7.x` - Upgrade to `glob@9.x`
- Various old packages in dependency tree

### 2. Security Vulnerabilities
- `cookie@<0.7.0` - Through @sentry/node
- `postcss@<8.4.31` - Through @vue/component-compiler-utils
- `request` - Server-Side Request Forgery
- `semver@<5.7.2` - RegExp DoS vulnerability
- `tough-cookie@<4.1.3` - Prototype Pollution
- `vue@2.x` - Multiple vulnerabilities
- `ws@7.0.0-7.5.9` - DoS vulnerability

### 3. Sources of Issues
Most issues come from:
- Legacy blockchain/Ethereum tooling (hardhat, web3-provider-engine)
- Old Vue.js ecosystem dependencies
- WalletConnect v1 SDKs (deprecated)

## Solution Plan

### Phase 1: Update Development Dependencies
1. Update ESLint to v9.x
2. Update all @types packages
3. Update testing framework versions

### Phase 2: Replace Deprecated Packages
1. Replace hardhat-docgen or find alternative
2. Update to WalletConnect v2
3. Replace deprecated blockchain packages

### Phase 3: Audit Fix with Breaking Changes
1. Apply npm audit fix --force selectively
2. Test functionality after each change

### Phase 4: Add Overrides for Unfixable Dependencies
1. Use npm overrides for transitive dependencies
2. Document security implications
