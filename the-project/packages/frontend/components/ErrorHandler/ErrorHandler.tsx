import React from 'react';

export interface ErrorState {
  type: 'warning' | 'error' | 'info';
  code: string;
  title: string;
  message: string;
  solution?: string;
  retryAction?: () => void;
  supportAction?: () => void;
}

interface ErrorHandlerProps {
  error: ErrorState | null;
  onDismiss: () => void;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, onDismiss }) => {
  if (!error) return null;

  const getErrorIcon = (type: ErrorState['type']) => {
    switch (type) {
      case 'error':
        return (
          <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-red-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-yellow-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        );
    }
  };

  const getBgColor = (type: ErrorState['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const getTextColor = (type: ErrorState['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className={`rounded-xl border p-4 ${getBgColor(error.type)}`}>
      <div className='flex items-start space-x-3'>
        {getErrorIcon(error.type)}

        <div className='flex-1 min-w-0'>
          <div className='flex items-center justify-between'>
            <h3 className={`text-sm font-semibold ${getTextColor(error.type)}`}>{error.title}</h3>
            <button
              onClick={onDismiss}
              className={`text-sm font-medium hover:opacity-75 ${getTextColor(error.type)}`}
            >
              ✕
            </button>
          </div>

          <p className={`text-sm mt-1 ${getTextColor(error.type)}`}>{error.message}</p>

          {error.solution && (
            <div className={`mt-2 text-sm ${getTextColor(error.type)}`}>
              <p className='font-medium'>💡 How to fix:</p>
              <p className='mt-1'>{error.solution}</p>
            </div>
          )}

          <div className='flex space-x-2 mt-3'>
            {error.retryAction && (
              <button
                onClick={error.retryAction}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                  error.type === 'error'
                    ? 'border-red-300 bg-red-100 text-red-700 hover:bg-red-200 dark:border-red-700 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700'
                    : error.type === 'warning'
                      ? 'border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-800 dark:text-yellow-200 dark:hover:bg-yellow-700'
                      : 'border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700'
                }`}
              >
                Try Again
              </button>
            )}

            {error.supportAction && (
              <button
                onClick={error.supportAction}
                className='px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                Get Help
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Common error states for USDT operations
export const createUSDTError = {
  insufficientBalance: (balance: string): ErrorState => ({
    type: 'error',
    code: 'INSUFFICIENT_BALANCE',
    title: 'Insufficient Balance',
    message: `You have ${balance} USDT, but need more for this transaction.`,
    solution: 'Add more USDT to your wallet or reduce the amount.',
  }),

  networkCongestion: (): ErrorState => ({
    type: 'warning',
    code: 'NETWORK_SLOW',
    title: 'Network is Busy',
    message: 'Transactions are taking longer than usual due to network congestion.',
    solution: 'Your transaction will complete, but may take 5-10 minutes longer.',
  }),

  slippageTooHigh: (currentSlippage: string): ErrorState => ({
    type: 'warning',
    code: 'HIGH_SLIPPAGE',
    title: 'High Price Impact',
    message: `Price impact is ${currentSlippage}%, which is higher than recommended.`,
    solution: 'Consider reducing your trade size or waiting for better market conditions.',
  }),

  walletNotConnected: (): ErrorState => ({
    type: 'info',
    code: 'WALLET_DISCONNECTED',
    title: 'Wallet Not Connected',
    message: 'Please connect your wallet to continue with the swap.',
    solution: 'Click the "Connect Wallet" button to get started.',
  }),

  unsupportedToken: (token: string): ErrorState => ({
    type: 'error',
    code: 'UNSUPPORTED_TOKEN',
    title: 'Token Not Supported',
    message: `${token} is not currently supported for cross-chain swaps.`,
    solution: 'Please select a different token from the supported list.',
  }),
};
