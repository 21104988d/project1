import React from 'react';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  description?: string;
  estimatedTime?: string;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  transactionHash?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ steps, transactionHash }) => {
  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
        );
      case 'active':
        return (
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
            <div className='w-3 h-3 bg-white rounded-full animate-pulse'></div>
          </div>
        );
      case 'error':
        return (
          <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className='w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center'>
            <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
          </div>
        );
    }
  };

  return (
    <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
          Transaction Progress
        </h3>
        {transactionHash && (
          <button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
            View on Explorer →
          </button>
        )}
      </div>

      <div className='space-y-4'>
        {steps.map(step => (
          <div key={step.id} className='flex items-start space-x-4'>
            {getStepIcon(step.status)}

            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <p
                  className={`text-sm font-medium ${
                    step.status === 'active'
                      ? 'text-blue-600 dark:text-blue-400'
                      : step.status === 'completed'
                        ? 'text-green-600 dark:text-green-400'
                        : step.status === 'error'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
                {step.estimatedTime && step.status === 'active' && (
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    ~{step.estimatedTime}
                  </span>
                )}
              </div>

              {step.description && (
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{step.description}</p>
              )}

              {step.status === 'active' && (
                <div className='mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700'>
                  <div
                    className='bg-blue-600 h-1.5 rounded-full animate-pulse'
                    style={{ width: '60%' }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Building Elements */}
      <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
          <svg
            className='w-4 h-4 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Secure • Non-custodial • Audited</span>
        </div>
      </div>
    </div>
  );
};
