// scripts/generate-types.ts
// 從合約生成 TypeScript 類型 (TypeChain)

import { execSync } from 'child_process';

function main() {
  try {
    console.log('正在生成 TypeChain 類型...');
    execSync('npx hardhat typechain', { stdio: 'inherit' });
    console.log('TypeChain 類型生成完成。');
  } catch (e) {
    console.error('TypeChain 類型生成失敗：', e);
    process.exit(1);
  }
}

main();
