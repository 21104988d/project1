// tests/e2e/specs/swap-flow.spec.ts
// End-to-end tests for the complete swap flow

import { test, expect } from '@playwright/test';

test.describe('USDT Cross-Chain Swap Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
  });

  test('should complete USDT to USDC cross-chain swap', async ({ page }) => {
    // Test wallet connection (mock)
    await page.click('[data-testid="connect-wallet"]');
    await page.click('[data-testid="metamask-connector"]');

    // Wait for wallet connection simulation
    await expect(page.locator('[data-testid="wallet-connected"]')).toBeVisible();

    // Configure swap parameters
    await page.selectOption('[data-testid="token-in-select"]', 'USDT');
    await page.selectOption('[data-testid="chain-in-select"]', '1'); // Ethereum
    await page.fill('[data-testid="amount-in-input"]', '100');

    await page.selectOption('[data-testid="token-out-select"]', 'USDC');
    await page.selectOption('[data-testid="chain-out-select"]', '42161'); // Arbitrum

    // Request quote
    await page.click('[data-testid="get-quote-button"]');

    // Wait for quote to load
    await expect(page.locator('[data-testid="quote-display"]')).toBeVisible();
    await expect(page.locator('[data-testid="amount-out"]')).toContainText(/\d+\.?\d*/);
    await expect(page.locator('[data-testid="gas-estimate"]')).toContainText(/\$\d+\.?\d*/);

    // Review quote details
    await expect(page.locator('[data-testid="route-steps"]')).toBeVisible();
    await expect(page.locator('[data-testid="price-impact"]')).toContainText(/%/);

    // Execute swap
    await page.click('[data-testid="execute-swap-button"]');

    // Confirm transaction (mock)
    await page.click('[data-testid="confirm-transaction"]');

    // Wait for transaction status
    await expect(page.locator('[data-testid="transaction-pending"]')).toBeVisible();

    // Should eventually show success (in a real scenario, this would take longer)
    await expect(page.locator('[data-testid="transaction-success"]')).toBeVisible({
      timeout: 10000,
    });

    // Verify transaction details
    await expect(page.locator('[data-testid="transaction-hash"]')).toBeVisible();
    await expect(page.locator('[data-testid="final-amount-received"]')).toContainText(/\d+\.?\d*/);
  });

  test('should handle insufficient balance error', async ({ page }) => {
    // Connect wallet
    await page.click('[data-testid="connect-wallet"]');
    await page.click('[data-testid="metamask-connector"]');
    await expect(page.locator('[data-testid="wallet-connected"]')).toBeVisible();

    // Try to swap more than available balance
    await page.selectOption('[data-testid="token-in-select"]', 'USDT');
    await page.fill('[data-testid="amount-in-input"]', '999999999');

    await page.selectOption('[data-testid="token-out-select"]', 'USDC');

    await page.click('[data-testid="get-quote-button"]');

    // Should show insufficient balance error
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      'Insufficient balance'
    );
    await expect(page.locator('[data-testid="execute-swap-button"]')).toBeDisabled();
  });

  test('should update quote when amount changes', async ({ page }) => {
    // Connect wallet and set up basic swap
    await page.click('[data-testid="connect-wallet"]');
    await page.click('[data-testid="metamask-connector"]');
    await expect(page.locator('[data-testid="wallet-connected"]')).toBeVisible();

    await page.selectOption('[data-testid="token-in-select"]', 'USDT');
    await page.selectOption('[data-testid="token-out-select"]', 'USDC');

    // Get initial quote
    await page.fill('[data-testid="amount-in-input"]', '100');
    await page.click('[data-testid="get-quote-button"]');
    await expect(page.locator('[data-testid="quote-display"]')).toBeVisible();

    const initialAmountOut = await page.locator('[data-testid="amount-out"]').textContent();

    // Change amount and get new quote
    await page.fill('[data-testid="amount-in-input"]', '200');
    await page.click('[data-testid="get-quote-button"]');

    // Wait for quote to update
    await page.waitForTimeout(1000);
    const newAmountOut = await page.locator('[data-testid="amount-out"]').textContent();

    // Amount out should be different (approximately double)
    expect(newAmountOut).not.toBe(initialAmountOut);
  });

  test('should show transaction history', async ({ page }) => {
    // Navigate to transaction history
    await page.click('[data-testid="transaction-history"]');

    // Should show history page
    await expect(page.locator('[data-testid="history-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="history-title"]')).toContainText(
      'Transaction History'
    );

    // Should have filter options
    await expect(page.locator('[data-testid="filter-status"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-chain"]')).toBeVisible();

    // Test filtering
    await page.selectOption('[data-testid="filter-status"]', 'completed');
    await expect(page.locator('[data-testid="transaction-row"]')).toHaveCount(0); // No transactions initially
  });
});
