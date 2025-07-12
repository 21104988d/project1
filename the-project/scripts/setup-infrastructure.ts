// scripts/setup-infrastructure.ts
// 數據庫和 Redis 設置腳本 (TypeScript)

import { execSync } from 'child_process';

function setupPostgres() {
  try {
    console.log('正在創建 PostgreSQL 數據庫 theproject_dev...');
    execSync('createdb theproject_dev', { stdio: 'inherit' });
    console.log('PostgreSQL 數據庫創建完成。');
  } catch {
    console.warn('PostgreSQL 數據庫可能已存在，跳過。');
  }
}

function setupRedis() {
  try {
    console.log('正在啟動 Redis 服務...');
    execSync('redis-server --daemonize yes', { stdio: 'inherit' });
    console.log('Redis 服務啟動完成。');
  } catch {
    console.warn('Redis 服務可能已在運行，跳過。');
  }
}

function main() {
  setupPostgres();
  setupRedis();
  console.log('基礎設施設置完成。');
}

main();
