import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
}

interface USDTNavigationProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export const USDTNavigation: React.FC<USDTNavigationProps> = ({ currentPage, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'swap',
      label: 'Swap',
      description: 'Exchange USDT across chains',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
          />
        </svg>
      ),
      isActive: currentPage === 'swap',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      description: 'View your USDT balances',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
          />
        </svg>
      ),
      isActive: currentPage === 'portfolio',
    },
    {
      id: 'history',
      label: 'History',
      description: 'Track your transactions',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      isActive: currentPage === 'history',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Market insights & trends',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
      isActive: currentPage === 'analytics',
      isDisabled: true, // Coming soon
    },
    {
      id: 'ux-demo',
      label: 'UX Demo',
      description: 'Experience optimization showcase',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
      ),
      isActive: currentPage === 'ux-demo',
    },
  ];

  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo & Brand */}
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>U</span>
            </div>
            <div>
              <h1 className='text-xl font-bold text-gray-900 dark:text-white'>USDT Bridge</h1>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Cross-chain made simple</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => !item.isDisabled && onNavigate(item.id)}
                disabled={item.isDisabled}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : item.isDisabled
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className='flex items-center space-x-2'>
                  {item.icon}
                  <span>{item.label}</span>
                  {item.isDisabled && (
                    <span className='text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded'>
                      Soon
                    </span>
                  )}
                </div>
                {item.isActive && (
                  <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full'></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>

          {/* Wallet Status (placeholder) */}
          <div className='hidden md:flex items-center space-x-3'>
            <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>Connected</span>
            </div>
            <button className='px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors'>
              0x1234...5678
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isExpanded && (
          <div className='md:hidden pb-4'>
            <div className='space-y-2'>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!item.isDisabled) {
                      onNavigate(item.id);
                      setIsExpanded(false);
                    }
                  }}
                  disabled={item.isDisabled}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    item.isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : item.isDisabled
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <span className='font-medium'>{item.label}</span>
                      {item.isDisabled && (
                        <span className='text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded'>
                          Soon
                        </span>
                      )}
                    </div>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Wallet Status */}
            <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span>Wallet Connected</span>
                </div>
                <button className='px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg'>
                  0x1234...5678
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
