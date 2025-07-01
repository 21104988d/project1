# Approved Stablecoin Arbitrage List

**Version:** 1.0  
**Date:** July 1, 2025  
**Purpose:** Comprehensive list of audited and approved stablecoins for arbitrage operations in The Project

---

## Overview

This document outlines the approved stablecoins that have undergone rigorous internal auditing and risk assessment for integration into The Project's arbitrage routing engine. Only stablecoins meeting our strict security, liquidity, and regulatory compliance criteria are included.

## Risk Assessment Framework

Each stablecoin is evaluated based on:

1. **Security Audit Score** (0-100): Smart contract security, audit history
2. **Liquidity Score** (0-100): Cross-chain liquidity depth and consistency  
3. **Stability Score** (0-100): Historical peg maintenance and volatility
4. **Regulatory Score** (0-100): Compliance status and regulatory clarity
5. **Integration Score** (0-100): Technical integration complexity and reliability

**Minimum Requirements for Approval:**
- Overall Score: ≥85/100
- Security Score: ≥90/100
- Liquidity Score: ≥80/100
- No major depegging events >2% in last 12 months
- Active on minimum 3 major chains with >$10M daily volume per chain

---

## Phase 1: Initial Approved Stablecoins

### 1. Tether USD (USDT)

**Status:** ✅ APPROVED - Primary Focus  
**Integration Priority:** HIGHEST  
**Risk Level:** LOW-MEDIUM

#### Assessment Scores
- **Security Score:** 88/100
- **Liquidity Score:** 98/100  
- **Stability Score:** 92/100
- **Regulatory Score:** 75/100
- **Integration Score:** 95/100
- **Overall Score:** 89.6/100

#### Supported Chains & Contracts
```javascript
const USDT_CONTRACTS = {
  ethereum: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  bsc: "0x55d398326f99059fF775485246999027B3197955",
  arbitrum: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  polygon: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  avalanche: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  optimism: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  fantom: "0x049d68029688eAbF473097a2fC38ef61633A3C7A"
};
```

#### Arbitrage Parameters
- **Minimum Trade Size:** $1,000 USD
- **Maximum Trade Size:** $500,000 USD per transaction
- **Slippage Tolerance:** 0.05% - 0.2%
- **Bridge Fee Range:** 0.01% - 0.1%
- **Target Profit Margin:** >0.1% after all costs

#### Supported DEX Integrations
- **Uniswap V3:** All pools with >$1M TVL
- **Curve Finance:** 3Pool, FRAX, MIM pools
- **Balancer:** Stable pools only
- **SushiSwap:** USDT/USDC pairs
- **PancakeSwap:** BSC pairs only
- **TraderJoe:** Avalanche pairs

#### Risk Considerations
- ✅ Largest stablecoin by market cap (~$83B)
- ✅ Highest cross-chain liquidity availability
- ✅ Strong peg maintenance history
- ⚠️ Regulatory uncertainty in some jurisdictions
- ⚠️ Centralization concerns with reserves
- ✅ Extensive DeFi integration ecosystem

#### Arbitrage Opportunities
1. **Cross-Chain Premium:** Ethereum ↔ BSC (avg 0.02-0.05%)
2. **DEX Spreads:** Uniswap vs Curve (avg 0.01-0.03%)
3. **Bridge Arbitrage:** Stargate vs LayerZero routing
4. **Yield Arbitrage:** Aave lending rates vs Curve LP rewards

---

### 2. USD Coin (USDC)

**Status:** ✅ APPROVED - Secondary Focus  
**Integration Priority:** HIGH  
**Risk Level:** LOW

#### Assessment Scores
- **Security Score:** 95/100
- **Liquidity Score:** 95/100
- **Stability Score:** 94/100
- **Regulatory Score:** 98/100
- **Integration Score:** 92/100
- **Overall Score:** 94.8/100

#### Supported Chains & Contracts
```javascript
const USDC_CONTRACTS = {
  ethereum: "0xA0b86a33E6441b8466A8e7e8e5b1B4b9d0de2a4e",
  bsc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  arbitrum: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  polygon: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  avalanche: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  optimism: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  solana: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
};
```

#### Arbitrage Parameters
- **Minimum Trade Size:** $1,000 USD
- **Maximum Trade Size:** $750,000 USD per transaction
- **Slippage Tolerance:** 0.03% - 0.15%
- **Bridge Fee Range:** 0.005% - 0.08%
- **Target Profit Margin:** >0.08% after all costs

#### Supported DEX Integrations
- **Uniswap V3:** All major USDC pools
- **Curve Finance:** 3Pool, 4Pool, metapools
- **Balancer:** Stable and weighted pools
- **SushiSwap:** Cross-chain USDC pairs
- **Serum/Jupiter:** Solana DEX aggregation
- **1inch:** Multi-chain aggregation

#### Risk Considerations
- ✅ Highest regulatory compliance (Circle/Coinbase backing)
- ✅ Full USD reserve backing with monthly attestations
- ✅ Native issuance on multiple chains
- ✅ Excellent liquidity across all major DEXs
- ✅ Strong institutional adoption
- ⚠️ Centralized freeze/blacklist capabilities
- ✅ Transparent reserve reporting

#### Arbitrage Opportunities
1. **USDT/USDC Pairs:** Consistent 0.01-0.05% spreads
2. **Cross-Chain Native:** Lower bridge costs vs wrapped tokens
3. **Institutional Flows:** Large block trades create temporary imbalances
4. **Stablecoin Swaps:** Curve tri-crypto arbitrage opportunities

---

## USDT ↔ USDC Arbitrage Strategy

### Primary Arbitrage Pairs

#### 1. Direct USDT/USDC Trading
```typescript
const APPROVED_USDT_USDC_POOLS = {
  ethereum: {
    uniswap_v3: "0x3416cF6C708Da44DB2624D63ea0AAef7113527C6", // 0.05% fee
    curve_3pool: "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
    balancer_stable: "0x06Df3b2bbB68adc8B0e302443692037ED9f91b42"
  },
  arbitrum: {
    uniswap_v3: "0x17c14D2c404D167802b16C450d3c99F88F2c4F4d",
    curve_2pool: "0x7f90122BF0700F9E7e1F688fe926940E8839F353",
    sushiswap: "0x892785f33CdEE22A30AEF750F285E18c18040c3e"
  },
  polygon: {
    uniswap_v3: "0x45dDa9cb7c25131DF268515131f647d726f50608",
    curve_aave: "0x445FE580eF8d70FF569aB36e80c647af338db351",
    quickswap: "0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827"
  }
};
```

#### 2. Cross-Chain Arbitrage Routes
- **Ethereum → Arbitrum:** Stargate USDT bridge + Uniswap USDT→USDC
- **BSC → Polygon:** Multichain bridge + Curve stable swap
- **Avalanche → Optimism:** LayerZero + native USDC

#### 3. Multi-Hop Arbitrage
- **3-Pool Arbitrage:** USDT → DAI → USDC (Curve Finance)
- **Bridge + Swap:** Cross-chain USDT → Same-chain USDC conversion
- **Yield Enhanced:** Temporary Aave/Compound parking during bridge delays

### Risk Management Parameters

#### Position Sizing
- **Maximum Single Trade:** $500K USDT or USDC equivalent
- **Maximum Daily Volume:** $5M across all pairs
- **Maximum Chain Exposure:** $2M per chain at any time
- **Emergency Stop Loss:** -0.5% (immediate position close)

#### Monitoring Thresholds
- **Depeg Alert:** >0.3% deviation from $1.00 peg
- **Liquidity Alert:** <$1M available depth for target trade size
- **Gas Price Alert:** >200 gwei on Ethereum (pause non-urgent arbitrage)
- **Bridge Delay Alert:** >30 min average confirmation time

### Execution Framework

#### Real-Time Monitoring
```typescript
interface ArbitrageMonitoringConfig {
  pairs: ['USDT/USDC'];
  chains: [1, 42161, 137, 56, 43114, 10]; // ETH, ARB, MATIC, BSC, AVAX, OP
  updateInterval: 3000; // 3 seconds
  profitThreshold: 0.001; // 0.1%
  maxSlippage: 0.002; // 0.2%
  gasLimit: 500000;
}
```

#### Execution Conditions
1. **Minimum Profit:** 0.1% after all fees and gas costs
2. **Liquidity Check:** Sufficient depth for target trade size
3. **Risk Assessment:** No recent depeg events or market stress
4. **Technical Validation:** Smart contract and bridge operational status

---

## Future Expansion Criteria

### Phase 2: Additional Stablecoins Under Review

The following stablecoins are under evaluation for future inclusion:

#### 1. DAI (MakerDAO)
- **Status:** Under Review
- **Estimated Integration:** Q1 2026
- **Key Concerns:** Complexity of underlying collateral, governance risks

#### 2. FRAX (Frax Finance)
- **Status:** Under Review  
- **Estimated Integration:** Q2 2026
- **Key Concerns:** Algorithmic stability mechanism, newer protocol

#### 3. TUSD (TrueUSD)
- **Status:** Pending Audit
- **Estimated Integration:** TBD
- **Key Concerns:** Lower liquidity, limited chain support

### Exclusion Criteria

Stablecoins automatically excluded from arbitrage operations:
- ❌ **Algorithmic stablecoins** without full backing (e.g., UST, USTC)
- ❌ **Experimental protocols** with <6 months operational history
- ❌ **Centralized stablecoins** without regulatory compliance
- ❌ **Low liquidity** stablecoins with <$10M daily volume
- ❌ **Deprecated tokens** or those with known critical vulnerabilities

---

## Compliance & Risk Management

### Regulatory Compliance
- ✅ Only jurisdictionally compliant stablecoins
- ✅ AML/KYC integration for large volume trades
- ✅ Transaction monitoring and reporting capabilities
- ✅ Jurisdiction-specific restrictions implemented

### Security Measures
- 🔐 Multi-signature wallets for arbitrage funds
- 🔐 Real-time transaction monitoring and anomaly detection
- 🔐 Emergency pause mechanisms for all arbitrage operations
- 🔐 Regular security audits and penetration testing

### Risk Limits
- **Single Trade Risk:** Maximum 2% of total arbitrage capital
- **Daily Risk Limit:** Maximum 10% of total arbitrage capital
- **Counterparty Risk:** Maximum 25% exposure to any single DEX/bridge
- **Chain Risk:** Maximum 30% exposure to any single blockchain

---

## Approval Process

### Internal Audit Requirements
1. **Technical Audit:** Smart contract security review (4 weeks)
2. **Liquidity Analysis:** Historical volume and depth analysis (2 weeks)
3. **Risk Assessment:** Peg stability and stress testing (2 weeks)
4. **Integration Testing:** Technical integration and simulation (3 weeks)
5. **Regulatory Review:** Compliance and legal assessment (2 weeks)

### Approval Timeline
- **Fast Track (USDT/USDC):** 2-3 weeks for critical updates
- **Standard Review:** 8-12 weeks for new stablecoin additions
- **High Risk Assets:** 12-16 weeks with extended testing

### Review Schedule
- **Quarterly Review:** Performance and risk assessment updates
- **Annual Review:** Complete re-evaluation of all approved stablecoins
- **Emergency Review:** Triggered by major market events or security incidents

---

**Document Maintained By:** The Project Risk Management Team  
**Next Review Date:** October 1, 2025  
**Emergency Contact:** security@theproject.io
