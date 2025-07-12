// scripts/seed-data.ts
// 使用代幣數據初始化數據庫 (TypeScript)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // TODO: 根據實際需求填充代幣數據
  console.log('正在初始化代幣數據...');
  await prisma.token.createMany({
    data: [
      { symbol: 'USDT', address: '0x...', chainId: 1, decimals: 6 },
      { symbol: 'USDC', address: '0x...', chainId: 1, decimals: 6 },
      // ...更多代幣
    ],
    skipDuplicates: true,
  });
  console.log('代幣數據初始化完成。');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
