import React, { useState, useEffect } from 'react';
import { ProgressTracker } from '../ProgressTracker/ProgressTracker';
import { ErrorHandler, createUSDTError } from '../ErrorHandler/ErrorHandler';
import type { ErrorState } from '../ErrorHandler/ErrorHandler';
import { createUSDTButton, createUSDTCard } from '../../styles/USDTDesignSystem';

interface SwapInterfaceProps {
  onSwap: (
    fromToken: string,
    fromChain: string,
    toToken: string,
    toChain: string,
    amount: string
  ) => void;
}

interface QuoteData {
  outputAmount: string;
  estimatedTime: string;
  fees: string;
  loading: boolean;
  slippage?: string;
}

interface TransactionState {
  isActive: boolean;
  steps: Array<{
    id: string;
    label: string;
    status: 'pending' | 'active' | 'completed' | 'error';
    description?: string;
    estimatedTime?: string;
  }>;
  hash?: string;
}

export const SwapInterface: React.FC<SwapInterfaceProps> = ({ onSwap }) => {
  const [fromToken, setFromToken] = useState('USDT');
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toToken, setToToken] = useState('USDT');
  const [toChain, setToChain] = useState('Arbitrum');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<ErrorState | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [quote, setQuote] = useState<QuoteData>({
    outputAmount: '',
    estimatedTime: '',
    fees: '',
    loading: false,
    slippage: '0.1',
  });

  const [transactionState, setTransactionState] = useState<TransactionState>({
    isActive: false,
    steps: [],
  });

  // Enhanced quote updates with error handling
  useEffect(() => {
    // Clear previous errors when user changes input
    if (error) setError(null);

    if (amount && parseFloat(amount) > 0) {
      // Validate amount
      const numAmount = parseFloat(amount);
      if (numAmount < 0.01) {
        setError(createUSDTError.insufficientBalance('0.01'));
        return;
      }

      if (numAmount > 10000) {
        setError({
          type: 'warning',
          code: 'LARGE_AMOUNT',
          title: 'Large Transaction',
          message: 'Transactions over $10,000 may experience higher slippage.',
          solution: 'Consider breaking this into smaller trades for better rates.',
        });
      }

      setQuote(prev => ({ ...prev, loading: true }));

      const timer = setTimeout(() => {
        // Simulate realistic USDT rates and slippage
        const isUSDTtoUSDT = fromToken === 'USDT' && toToken === 'USDT';
        const rate = isUSDTtoUSDT
          ? 0.9995 // Small fee for cross-chain USDT
          : fromToken === 'ETH' && toToken === 'USDT'
            ? 3420.5
            : fromToken === 'USDT' && toToken === 'ETH'
              ? 0.0002925
              : 1.0;

        const outputAmount = (numAmount * rate).toFixed(isUSDTtoUSDT ? 2 : 6);
        const fees = (numAmount * 0.0001).toFixed(6); // 0.01% fee
        const slippage = numAmount > 1000 ? '0.15' : '0.1'; // Higher slippage for larger amounts

        setQuote({
          outputAmount,
          estimatedTime: fromChain === toChain ? '30 seconds' : '2-3 minutes',
          fees,
          loading: false,
          slippage,
        });
      }, 120); // Ultra-fast quote updates

      return () => clearTimeout(timer);
    } else {
      setQuote({
        outputAmount: '',
        estimatedTime: '',
        fees: '',
        loading: false,
      });
    }
  }, [amount, fromToken, toToken, fromChain, toChain, error]);

  const initializeSwap = () => {
    setIsSwapping(true);
    setTransactionState({
      isActive: true,
      steps: [
        {
          id: 'approve',
          label: 'Approve Token',
          status: 'active',
          description: `Approve ${amount} ${fromToken} for swapping`,
          estimatedTime: '30 seconds',
        },
        {
          id: 'bridge',
          label: 'Cross-Chain Bridge',
          status: 'pending',
          description: `Bridge tokens from ${fromChain} to ${toChain}`,
          estimatedTime: '2-3 minutes',
        },
        {
          id: 'swap',
          label: 'Complete Swap',
          status: 'pending',
          description: `Receive ${quote.outputAmount} ${toToken}`,
          estimatedTime: '10 seconds',
        },
        {
          id: 'confirm',
          label: 'Transaction Complete',
          status: 'pending',
          description: 'Tokens are now in your wallet',
        },
      ],
    });

    // Simulate transaction progression
    const progressTimer = setTimeout(() => {
      setTransactionState(prev => ({
        ...prev,
        steps: prev.steps.map(step =>
          step.id === 'approve'
            ? { ...step, status: 'completed' }
            : step.id === 'bridge'
              ? { ...step, status: 'active' }
              : step
        ),
      }));

      setTimeout(() => {
        setTransactionState(prev => ({
          ...prev,
          steps: prev.steps.map(step =>
            step.id === 'bridge'
              ? { ...step, status: 'completed' }
              : step.id === 'swap'
                ? { ...step, status: 'active' }
                : step
          ),
        }));

        setTimeout(() => {
          setTransactionState(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
              step.id === 'swap'
                ? { ...step, status: 'completed' }
                : step.id === 'confirm'
                  ? { ...step, status: 'completed' }
                  : step
            ),
          }));

          onSwap(fromToken, fromChain, toToken, toChain, amount);
          setIsSwapping(false);

          // Reset after success
          setTimeout(() => {
            setTransactionState({ isActive: false, steps: [] });
          }, 3000);
        }, 1500);
      }, 2000);
    }, 1000);

    return () => clearTimeout(progressTimer);
  };

  const handleSwap = () => {
    if (amount && quote.outputAmount && !quote.loading) {
      initializeSwap();
    }
  };

  const isValid =
    amount && parseFloat(amount) > 0 && quote.outputAmount && !quote.loading && !isSwapping;

  // Show transaction progress if active
  if (transactionState.isActive) {
    return (
      <div className='max-w-md mx-auto mt-8 space-y-6'>
        <ProgressTracker steps={transactionState.steps} transactionHash={transactionState.hash} />
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-8 space-y-6'>
      {/* Error Display */}
      {error && <ErrorHandler error={error} onDismiss={() => setError(null)} />}

      {/* Main Swap Card - Enhanced with design system */}
      <div className={createUSDTCard('high')}>
        {/* Header with USDT Branding */}
        <div className='bg-gradient-to-r from-green-500 to-green-600 p-6 text-center'>
          <div className='flex items-center justify-center space-x-2 mb-2'>
            <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
              <span className='text-green-600 font-bold text-sm'>₮</span>
            </div>
            <h1 className='text-2xl font-bold text-white'>USDT Bridge</h1>
          </div>
          <p className='text-green-100'>Zero-slip cross-chain swaps</p>
          <div className='mt-2 text-xs text-green-200'>
            ✓ Instant quotes • ✓ Best rates • ✓ Secure
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* You Send Section - Enhanced */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                You Send
              </label>
              <button className='text-xs text-blue-600 hover:text-blue-800 font-medium'>
                Use Max
              </button>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <input
                type='number'
                placeholder='0.00'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className='text-2xl font-bold bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors'
              />
              <select
                value={fromToken}
                onChange={e => setFromToken(e.target.value)}
                className='bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 font-semibold focus:border-green-500 focus:outline-none'
              >
                <option value='USDT'>USDT</option>
                <option value='USDC'>USDC</option>
                <option value='ETH'>ETH</option>
              </select>
            </div>
            <select
              value={fromChain}
              onChange={e => setFromChain(e.target.value)}
              className='w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none'
            >
              <option value='Ethereum'>From: Ethereum</option>
              <option value='Arbitrum'>From: Arbitrum</option>
              <option value='Polygon'>From: Polygon</option>
            </select>
          </div>

          {/* Enhanced Swap Direction Arrow */}
          <div className='flex justify-center'>
            <button
              onClick={() => {
                // Swap direction
                const tempToken = fromToken;
                const tempChain = fromChain;
                setFromToken(toToken);
                setFromChain(toChain);
                setToToken(tempToken);
                setToChain(tempChain);
              }}
              className='p-3 bg-green-50 dark:bg-green-900 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition-colors group'
            >
              <svg
                className='w-6 h-6 text-green-600 group-hover:rotate-180 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                />
              </svg>
            </button>
          </div>

          {/* You Receive Section - Enhanced */}
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
              You Receive
            </label>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-2xl font-bold bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-600 rounded-xl px-4 py-3 text-green-600'>
                {quote.loading ? (
                  <div className='animate-pulse flex space-x-1'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-bounce'></div>
                    <div
                      className='w-2 h-2 bg-green-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-green-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                ) : (
                  quote.outputAmount || '0.00'
                )}
              </div>
              <select
                value={toToken}
                onChange={e => setToToken(e.target.value)}
                className='bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 font-semibold focus:border-green-500 focus:outline-none'
              >
                <option value='USDT'>USDT</option>
                <option value='USDC'>USDC</option>
                <option value='ETH'>ETH</option>
              </select>
            </div>
            <select
              value={toChain}
              onChange={e => setToChain(e.target.value)}
              className='w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none'
            >
              <option value='Arbitrum'>To: Arbitrum</option>
              <option value='Ethereum'>To: Ethereum</option>
              <option value='Polygon'>To: Polygon</option>
            </select>
          </div>

          {/* Enhanced Transparent Summary */}
          {quote.outputAmount && !quote.loading && (
            <div className='bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-xl p-4'>
              <div className='text-center'>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>
                  Send {amount} {fromToken}, get exactly {quote.outputAmount} {toToken}
                </p>
                <div className='flex items-center justify-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  <span>
                    Fee: {quote.fees} {fromToken}
                  </span>
                  <span>•</span>
                  <span>Slippage: {quote.slippage}%</span>
                  <span>•</span>
                  <span>Time: {quote.estimatedTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced One Button with Design System */}
          <button
            onClick={handleSwap}
            disabled={!isValid}
            className={
              isValid
                ? `${createUSDTButton('primary')} w-full py-4 text-lg`
                : 'w-full py-4 px-6 rounded-xl font-bold text-lg bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed transition-all duration-200'
            }
          >
            {quote.loading
              ? 'Getting Quote...'
              : isSwapping
                ? 'Processing...'
                : isValid
                  ? `Swap ${fromToken} → ${toToken}`
                  : 'Enter Amount'}
          </button>

          {/* Trust Building Footer */}
          <div className='flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400'>
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>Audited</span>
            </div>
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              <span>Non-custodial</span>
            </div>
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
