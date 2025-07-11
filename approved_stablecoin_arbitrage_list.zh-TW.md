# 已審核穩定幣套利清單

**版本：** v1.0.0  
**日期：** 2025年7月1日  
**狀態：** 等待 v2.0.0 戰略更新審查  
**目的：** The Project 套利路由引擎中已審核和批准的穩定幣綜合清單

---

## 概述

本文件概述了經過嚴格內部審計和風險評估，可整合到 The Project 套利路由引擎的已批准穩定幣。僅包含符合我們嚴格安全性、流動性和法規合規標準的穩定幣。

## 風險評估框架

每個穩定幣都在五個關鍵維度上接受全面評估。我們詳細的評分方法確保透明、客觀地評估套利適用性。

### 1. 安全審計分數 (0-100)

#### 智能合約安全 (40分)
- **正式審計 (20分)：** 
  - 4+大型審計 (20分) | 2-3次審計 (15分) | 1次審計 (10分) | 無審計 (0分)
- **審計質量 (10分)：**
  - 無關鍵/高風險發現 (10分) | 輕微問題已解決 (7分) | 部分未解決 (3分) | 關鍵未解決 (0分)
- **漏洞賞金計劃 (10分)：**
  - 活躍計劃>100萬美元獎池 (10分) | 活躍<100萬美元 (7分) | 有限計劃 (3分) | 無 (0分)

#### 協議成熟度 (30分)
- **運營歷史 (15分)：**
  - >5年 (15分) | 3-5年 (12分) | 1-3年 (8分) | <1年 (3分)
- **總鎖定價值 (10分)：**
  - >500億美元 (10分) | 200-500億美元 (8分) | 50-200億美元 (5分) | <50億美元 (2分)
- **安全事件 (5分)：**
  - 無事件 (5分) | 輕微事件已解決 (3分) | 重大事件 (1分) | 持續問題 (0分)

#### 透明度與治理 (30分)
- **儲備證明 (15分)：**
  - 實時/月度 (15分) | 季度 (10分) | 半年度 (5分) | 年度/無 (0分)
- **程式碼透明度 (10分)：**
  - 完全開源 (10分) | 部分開放 (6分) | 僅驗證合約 (3分) | 閉源 (0分)
- **治理質量 (5分)：**
  - 去中心化治理 (5分) | 多簽治理 (3分) | 中心化透明 (1分) | 不透明 (0分)

### 2. 流動性分數 (0-100)

#### 跨鏈可用性 (25分)
- **鏈數量 (15分)：**
  - 7+主要鏈 (15分) | 5-6鏈 (12分) | 3-4鏈 (8分) | 1-2鏈 (3分)
- **原生 vs 包裝 (10分)：**
  - 5+鏈原生 (10分) | 3+原生 (7分) | 1-2原生 (4分) | 僅包裝 (1分)

#### 交易量 (35分)
- **每鏈日交易量 (20分)：**
  - >1億美元 (20分) | 5000萬-1億美元 (15分) | 2000萬-5000萬美元 (10分) | 1000萬-2000萬美元 (5分) | <1000萬美元 (0分)
- **交易量一致性 (10分)：**
  - <20% 日波動 (10分) | 20-40% (7分) | 40-60% (4分) | >60% (1分)
- **市場深度 (5分)：**
  - >1000萬美元深度 ±0.1% (5分) | 500-1000萬美元 (3分) | 100-500萬美元 (1分) | <100萬美元 (0分)

#### DEX 整合質量 (40分)
- **主要 DEX 覆蓋 (25分)：**
  - 每鏈前5個DEX (25分) | 3-4個DEX (18分) | 2個DEX (10分) | 1個DEX (3分)
- **池多樣性 (10分)：**
  - 多種池類型 (10分) | 2種池類型 (6分) | 單一類型 (3分)
- **滑點表現 (5分)：**
  - 10萬美元交易 <0.05% (5分) | 0.05-0.1% (3分) | 0.1-0.2% (1分) | >0.2% (0分)

### 3. 穩定性分數 (0-100)

#### 錨定維持 (50分)
- **12個月穩定性 (25分)：**
  - 最大偏差 <0.5% (25分) | <1% (20分) | <2% (15分) | <3% (8分) | >3% (0分)
- **恢復速度 (15分)：**
  - <1小時至0.1% (15分) | <4小時 (10分) | <24小時 (5分) | >24小時 (1分)
- **壓力測試表現 (10分)：**
  - 重大事件中維持錨定 (10分) | 輕微偏差 (6分) | 顯著偏差 (2分) | 失敗 (0分)

#### 市場行為 (30分)
- **波動性指標 (20分)：**
  - 30天波動性 <0.1% (20分) | <0.2% (15分) | <0.5% (8分) | >0.5% (3分)
- **與美元相關性 (10分)：**
  - >0.99 相關性 (10分) | 0.95-0.99 (7分) | 0.90-0.95 (4分) | <0.90 (1分)

#### 機制可靠性 (20分)
- **錨定機制 (15分)：**
  - 完全抵押支持 (15分) | 超額抵押 (12分) | 有支持的算法 (8分) | 純算法 (3分)
- **緊急機制 (5分)：**
  - 經驗證的緊急程序 (5分) | 有文檔程序 (3分) | 基本措施 (1分) | 無 (0分)

### 4. 監管分數 (0-100)

#### 合規狀態 (40分)
- **監管批准 (25分)：**
  - 多個司法管轄區 (25分) | 單一主要司法管轄區 (18分) | 待批准 (8分) | 無批准 (0分)
- **許可狀態 (15分)：**
  - 貨幣傳輸許可 (15分) | 電子貨幣許可 (10分) | 加密貨幣許可 (5分) | 無許可 (0分)

#### 監管風險 (35分)
- **司法管轄區風險 (20分)：**
  - 僅低風險司法管轄區 (20分) | 混合司法管轄區 (12分) | 部分高風險 (6分) | 主要高風險 (0分)
- **執法歷史 (10分)：**
  - 無執法行動 (10分) | 輕微已解決 (6分) | 重大已解決 (2分) | 持續問題 (0分)
- **政治風險 (5分)：**
  - 穩定監管環境 (5分) | 部分不確定性 (3分) | 高不確定性 (1分) | 敵對環境 (0分)

#### 透明度與報告 (25分)
- **財務報告 (15分)：**
  - 完全公開報告 (15分) | 有限報告 (8分) | 基本報告 (3分) | 無報告 (0分)
- **監管溝通 (10分)：**
  - 主動參與 (10分) | 積極回應 (6分) | 最小限度 (2分) | 差 (0分)

### 5. 整合分數 (0-100)

#### 技術整合 (50分)
- **API 質量 (20分)：**
  - 有文檔的綜合API (20分) | 良好API (15分) | 基本API (8分) | 有限 (3分)
- **橋接支持 (15分)：**
  - 5+橋接協議 (15分) | 3-4橋接 (10分) | 1-2橋接 (5分) | 無原生橋接 (1分)
- **智能合約標準 (15分)：**
  - 完全 ERC-20/SPL 合規 (15分) | 輕微偏差 (10分) | 自定義實現 (5分) | 非標準 (1分)

#### 運營可靠性 (30分)
- **運行時間歷史 (15分)：**
  - >99.9%運行時間 (15分) | 99.5-99.9% (10分) | 99-99.5% (5分) | <99% (1分)
- **網絡效應 (10分)：**
  - 廣泛整合 (10分) | 良好整合 (6分) | 有限整合 (2分) | 差整合 (0分)
- **升級可靠性 (5分)：**
  - 順利升級歷史 (5分) | 輕微問題 (3分) | 一些問題 (1分) | 重大失敗 (0分)

#### 開發者體驗 (20分)
- **文檔質量 (10分)：**
  - 優秀文檔 (10分) | 良好 (6分) | 基本 (3分) | 差 (1分)
- **開發者支持 (5分)：**
  - 活躍支持渠道 (5分) | 有限支持 (2分) | 無支持 (0分)
- **整合複雜性 (5分)：**
  - 簡單整合 (5分) | 中等複雜性 (3分) | 複雜 (1分) | 非常複雜 (0分)

### 總體評分與批准門檻

**批准的最低要求：**
- **總體分數：** ≥85/100
- **安全分數：** ≥90/100（關鍵要求）
- **流動性分數：** ≥80/100
- **穩定性分數：** ≥85/100
- **無單一類別：** <70/100
- **額外要求：**
  - 過去12個月內無重大脫鉤事件>2%
  - 在至少3個主要鏈上活躍，每鏈日交易量>1000萬美元
  - 必須通過壓力測試模擬

---

## 第一階段：初始批准穩定幣

### 1. Tether USD (USDT)

**狀態：** ✅ 已批准 - 主要重點  
**整合優先級：** 最高  
**風險級別：** 低-中等

#### 評估分數

**安全分數：88/100**
- 智能合約安全：35/40（多次審計，已解決發現，活躍漏洞賞金）
- 協議成熟度：28/30（9+ 年運營，830億美元市值，最少事件）
- 透明度與治理：25/30（月度證明，驗證合約，中心化治理）

**流動性分數：98/100**
- 跨鏈可用性：25/25（7+ 主要鏈上原生/包裝）
- 交易量：35/35（每鏈日交易量 >1億美元，一致交易量，深度流動性）
- DEX 整合：38/40（在所有主要 DEX 整合，多種池類型，優秀滑點）

**穩定性分數：92/100**
- 錨定維持：45/50（12個月最大 0.8% 偏差，快速恢復，壓力測試）
- 市場行為：27/30（低波動性，高美元相關性）
- 機制可靠性：20/20（完全支持聲稱，有文檔程序）

**監管分數：75/100**
- 合規狀態：25/40（有限監管批准，部分許可）
- 監管風險：25/35（混合司法管轄區，部分執法歷史，中等政治風險）
- 透明度：25/25（定期證明，主動溝通）

**整合分數：95/100**
- 技術整合：48/50（優秀 API，廣泛橋接支持，完全 ERC-20 合規）
- 運營可靠性：28/30（高運行時間，廣泛整合，順利運營）
- 開發者體驗：19/20（優秀文檔，強力支持，簡單整合）

**總體分數：89.6/100** ✅ **已批准**

#### 支援鏈和合約
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

#### 套利參數
- **最小交易規模：** 1,000 美元
- **最大交易規模：** 每筆交易 500,000 美元
- **滑點容忍度：** 0.05% - 0.2%
- **橋接費用範圍：** 0.01% - 0.1%
- **目標利潤邊際：** 扣除所有成本後 >0.1%

#### 支援的 DEX 整合
- **Uniswap V3：** 所有 TVL >100萬美元的池
- **Curve Finance：** 3Pool、FRAX、MIM 池
- **Balancer：** 僅穩定池
- **SushiSwap：** USDT/USDC 對
- **PancakeSwap：** 僅 BSC 對
- **TraderJoe：** Avalanche 對

#### 風險考量
- ✅ 市值最大的穩定幣 (~830億美元)
- ✅ 最高跨鏈流動性可用性
- ✅ 強勁的錨定維持歷史
- ⚠️ 某些司法管轄區的監管不確定性
- ⚠️ 儲備金中心化問題
- ✅ 廣泛的 DeFi 整合生態系統

#### 套利機會
1. **跨鏈溢價：** 以太坊 ↔ BSC (平均 0.02-0.05%)
2. **DEX 價差：** Uniswap vs Curve (平均 0.01-0.03%)
3. **橋接套利：** Stargate vs LayerZero 路由
4. **收益套利：** Aave 借貸利率 vs Curve LP 獎勵

---

### 2. USD Coin (USDC)

**狀態：** ✅ 已批准 - 次要重點  
**整合優先級：** 高  
**風險級別：** 低

#### 評估分數

**安全分數：95/100**
- 智能合約安全：38/40（多次頂級審計，無關鍵發現，大額漏洞賞金）
- 協議成熟度：30/30（5+ 年運營，Circle/Coinbase 支持，無安全事件）
- 透明度與治理：27/30（月度證明，開源，多簽治理）

**流動性分數：95/100**
- 跨鏈可用性：25/25（包括 Solana 在內的 7+ 鏈原生發行）
- 交易量：33/35（每鏈日交易量 >5000萬美元，非常一致的交易量，優秀深度）
- DEX 整合：37/40（在所有主要 DEX 可用，多種池類型，低滑點）

**穩定性分數：94/100**
- 錨定維持：48/50（12個月最大 0.5% 偏差，快速恢復，優秀壓力表現）
- 市場行為：28/30（非常低波動性，優秀美元相關性）
- 機制可靠性：18/20（完全美元支持與證明，經驗證緊急程序）

**監管分數：98/100**
- 合規狀態：40/40（多個司法管轄區，貨幣傳輸許可）
- 監管風險：33/35（低風險司法管轄區，無執法行動，穩定環境）
- 透明度：25/25（完全公開報告，優秀監管溝通）

**整合分數：92/100**
- 技術整合：45/50（優秀 API，良好橋接支持，完全合規標準）
- 運營可靠性：29/30（卓越運行時間，普遍整合，可靠升級）
- 開發者體驗：18/20（優秀文檔，活躍支持，直接整合）

**總體分數：94.8/100** ✅ **已批准**

#### 支援鏈和合約
```javascript
const USDC_CONTRACTS = {
  ethereum: "0xA0b86a33E6448193c3Cf4FB58E3E2e80e96C5B8B",
  bsc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  arbitrum: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  polygon: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  avalanche: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  optimism: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  solana: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
};
```

#### 套利參數
- **最小交易規模：** 1,000 美元
- **最大交易規模：** 每筆交易 750,000 美元
- **滑點容忍度：** 0.03% - 0.15%
- **橋接費用範圍：** 0.005% - 0.08%
- **目標利潤邊際：** 扣除所有成本後 >0.08%

#### 支援的 DEX 整合
- **Uniswap V3：** 所有主要 USDC 池
- **Curve Finance：** 3Pool、4Pool、metapools
- **Balancer：** 穩定和加權池
- **SushiSwap：** 跨鏈 USDC 對
- **Serum/Jupiter：** Solana DEX 聚合
- **1inch：** 多鏈聚合

#### 風險考量
- ✅ 最高監管合規性 (Circle/Coinbase 支持)
- ✅ 完全美元儲備支持，月度證明
- ✅ 多鏈原生發行
- ✅ 所有主要 DEX 的優秀流動性
- ✅ 強勁的機構採用
- ⚠️ 中心化凍結/黑名單功能
- ✅ 透明的儲備報告

#### 套利機會
1. **USDT/USDC 對：** 一致的 0.01-0.05% 價差
2. **跨鏈原生：** 較低的橋接成本 vs 包裝代幣
3. **機構流量：** 大宗交易創造暫時失衡
4. **穩定幣交換：** Curve tri-crypto 套利機會

---

## USDT ↔ USDC 套利策略

### 主要套利對

#### 1. 直接 USDT/USDC 交易
```typescript
const APPROVED_USDT_USDC_POOLS = {
  ethereum: {
    uniswap_v3: "0x3416cF6C708Da44DB2624D63ea0AAef7113527C6", // 0.05% 費用
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

#### 2. 跨鏈套利路線
- **以太坊 → Arbitrum：** Stargate USDT 橋接 + Uniswap USDT→USDC
- **BSC → Polygon：** Multichain 橋接 + Curve 穩定交換
- **Avalanche → Optimism：** LayerZero + 原生 USDC

#### 3. 多跳套利
- **3池套利：** USDT → DAI → USDC (Curve Finance)
- **橋接 + 交換：** 跨鏈 USDT → 同鏈 USDC 轉換
- **收益增強：** 橋接延遲期間臨時 Aave/Compound 停放

### 風險管理參數

#### 倉位規模
- **最大單筆交易：** 50萬美元 USDT 或 USDC 等值
- **最大日交易量：** 所有對 500萬美元
- **最大鏈暴露：** 任何時候每鏈 200萬美元
- **緊急止損：** -0.5% (立即平倉)

#### 監控閾值
- **脫鉤警報：** 偏離 $1.00 錨定 >0.3%
- **流動性警報：** 目標交易規模可用深度 <100萬美元
- **Gas 價格警報：** 以太坊 >200 gwei (暫停非緊急套利)
- **橋接延遲警報：** 平均確認時間 >30分鐘

### 執行框架

#### 實時監控
```typescript
interface ArbitrageMonitoringConfig {
  pairs: ['USDT/USDC'];
  chains: [1, 42161, 137, 56, 43114, 10]; // ETH, ARB, MATIC, BSC, AVAX, OP
  updateInterval: 3000; // 3秒
  profitThreshold: 0.001; // 0.1%
  maxSlippage: 0.002; // 0.2%
  gasLimit: 500000;
}
```

#### 執行條件
1. **最小利潤：** 扣除所有費用和 gas 成本後 0.1%
2. **流動性檢查：** 目標交易規模的充足深度
3. **風險評估：** 無近期脫鉤事件或市場壓力
4. **技術驗證：** 智能合約和橋接運營狀態

---

## 未來擴展標準

### 第二階段：審查中的其他穩定幣

以下穩定幣正在評估中以供未來納入：

#### 1. DAI (MakerDAO)
- **狀態：** 審查中
- **預估整合：** 2026年第一季
- **主要關注：** 底層抵押品複雜性、治理風險

#### 2. FRAX (Frax Finance)
- **狀態：** 審查中  
- **預估整合：** 2026年第二季
- **主要關注：** 算法穩定機制、較新協議

#### 3. TUSD (TrueUSD)
- **狀態：** 待審計
- **預估整合：** 待定
- **主要關注：** 較低流動性、有限鏈支持

### 排除標準

自動排除的穩定幣：
- ❌ **算法穩定幣** 無完全支持 (例如 UST、USTC)
- ❌ **實驗性協議** 運營歷史 <6個月
- ❌ **中心化穩定幣** 無監管合規
- ❌ **低流動性** 穩定幣日交易量 <1000萬美元
- ❌ **已棄用代幣** 或有已知關鍵漏洞的代幣

---

## 合規與風險管理

### 監管合規
- ✅ 僅司法管轄區合規穩定幣
- ✅ 大額交易的 AML/KYC 整合
- ✅ 交易監控和報告功能
- ✅ 實施司法管轄區特定限制

### 安全措施
- 🔐 套利資金的多簽錢包
- 🔐 實時交易監控和異常檢測
- 🔐 所有套利操作的緊急暫停機制
- 🔐 定期安全審計和滲透測試

### 風險限制
- **單筆交易風險：** 總套利資本的最大 2%
- **日風險限制：** 總套利資本的最大 10%
- **對手方風險：** 任何單一 DEX/橋接的最大 25% 暴露
- **鏈風險：** 任何單一區塊鏈的最大 30% 暴露

---

## 批准流程

### 內部審計要求
1. **技術審計：** 智能合約安全審查 (4週)
2. **流動性分析：** 歷史交易量和深度分析 (2週)
3. **風險評估：** 錨定穩定性和壓力測試 (2週)
4. **整合測試：** 技術整合和模擬 (3週)
5. **監管審查：** 合規和法律評估 (2週)

### 批准時間表
- **快速通道 (USDT/USDC)：** 關鍵更新 2-3週
- **標準審查：** 新穩定幣添加 8-12週
- **高風險資產：** 延長測試 12-16週

### 審查計劃
- **季度審查：** 性能和風險評估更新
- **年度審查：** 所有批准穩定幣的完整重新評估
- **緊急審查：** 由重大市場事件或安全事件觸發

---

**文件維護：** The Project 風險管理團隊  
**下次審查日期：** 2025年10月1日  
**緊急聯繫：** security@theproject.io
