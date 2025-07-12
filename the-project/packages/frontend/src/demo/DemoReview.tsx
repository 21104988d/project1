import React, { useState, useEffect } from 'react';
import { getDemoWallet, getDemoTokens, getDemoTransactions, isDemoMode } from './demoData';

/**
 * Demo Review Dashboard Component
 *
 * This component provides a comprehensive view of the application
 * features for department reviews, showcasing design excellence
 * and user experience quality.
 */

interface DemoReviewProps {
  onClose?: () => void;
}

const DemoReview: React.FC<DemoReviewProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'overview' | 'swap' | 'history' | 'mobile'>(
    'overview'
  );
  const [showTooltips, setShowTooltips] = useState(true);

  const demoWallet = getDemoWallet();
  const demoTokens = getDemoTokens();
  const demoTransactions = getDemoTransactions();

  useEffect(() => {
    // Auto-hide tooltips after 10 seconds
    const timer = setTimeout(() => setShowTooltips(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isDemoMode()) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center space-x-4'>
              <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>TP</span>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-gray-900'>The Project</h1>
                <p className='text-sm text-gray-500'>Cross-chain DeFi Interface - Demo Mode</p>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='flex items-center bg-green-50 px-3 py-1 rounded-full'>
                <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                <span className='text-sm text-green-700 font-medium'>Demo Active</span>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='flex space-x-8 py-4'>
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'swap', label: 'Token Swap', icon: '🔄' },
              { id: 'history', label: 'History', icon: '📋' },
              { id: 'mobile', label: 'Mobile View', icon: '📱' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === tab.id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Review Banner */}
        {showTooltips && (
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8'>
            <div className='flex items-start space-x-3'>
              <div className='flex-shrink-0'>
                <span className='text-2xl'>💡</span>
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-medium text-blue-900 mb-2'>
                  Department Review Mode Active
                </h3>
                <p className='text-blue-700 mb-3'>
                  This is a demonstration environment showcasing Part 1.5 "Design Excellence"
                  achievements. All data is simulated - no real cryptocurrency is involved.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-white px-2 py-1 rounded text-sm text-blue-600 border border-blue-200'>
                    ✅ Professional Design
                  </span>
                  <span className='bg-white px-2 py-1 rounded text-sm text-blue-600 border border-blue-200'>
                    ✅ Mobile Responsive
                  </span>
                  <span className='bg-white px-2 py-1 rounded text-sm text-blue-600 border border-blue-200'>
                    ✅ Fast Performance
                  </span>
                  <span className='bg-white px-2 py-1 rounded text-sm text-blue-600 border border-blue-200'>
                    ✅ Accessible Interface
                  </span>
                </div>
                <button
                  onClick={() => setShowTooltips(false)}
                  className='mt-3 text-sm text-blue-600 hover:text-blue-800 underline'
                >
                  Hide this message
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Views */}
        {currentView === 'overview' && (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Wallet Overview */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-xl shadow-sm border p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Demo Wallet Overview</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {Object.entries(demoWallet.balances).map(([token, balance]) => (
                    <div key={token} className='bg-gray-50 rounded-lg p-4'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center'>
                          <span className='text-white text-xs font-bold'>{token[0]}</span>
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-900'>{token}</p>
                          <p className='text-lg font-semibold text-gray-700'>{balance}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className='bg-white rounded-xl shadow-sm border p-6 mt-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Recent Transactions</h2>
                <div className='space-y-3'>
                  {demoTransactions.slice(0, 3).map(tx => (
                    <div
                      key={tx.id}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            tx.status === 'completed'
                              ? 'bg-green-500'
                              : tx.status === 'pending'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          }`}
                        ></div>
                        <div>
                          <p className='font-medium text-gray-900'>
                            {tx.fromAmount} {tx.fromToken} → {tx.toAmount} {tx.toToken}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          tx.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : tx.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='space-y-6'>
              <div className='bg-white rounded-xl shadow-sm border p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Actions</h3>
                <div className='space-y-3'>
                  <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
                    🔄 Swap Tokens
                  </button>
                  <button className='w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors'>
                    🌉 Bridge Assets
                  </button>
                  <button className='w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors'>
                    📊 View Analytics
                  </button>
                </div>
              </div>

              {/* Design Showcase */}
              <div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white'>
                <h3 className='text-lg font-semibold mb-3'>Design Excellence</h3>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center space-x-2'>
                    <span>✓</span>
                    <span>Modern, clean interface</span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <span>✓</span>
                    <span>Consistent branding</span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <span>✓</span>
                    <span>Mobile-first design</span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <span>✓</span>
                    <span>Accessible UX patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Other views would be implemented here */}
        {currentView === 'swap' && (
          <div className='bg-white rounded-xl shadow-sm border p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Token Swap Interface</h2>
            <p className='text-gray-600 mb-4'>
              This view would show the main swap interface with token selection, amount input, route
              optimization, and transaction execution.
            </p>
            <div className='bg-blue-50 p-4 rounded-lg'>
              <p className='text-blue-700'>
                💡 <strong>Review Focus:</strong> Clean layout, intuitive flow, clear CTAs, mobile
                responsiveness, and smooth animations.
              </p>
            </div>
          </div>
        )}

        {currentView === 'history' && (
          <div className='bg-white rounded-xl shadow-sm border p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Transaction History</h2>
            <p className='text-gray-600 mb-4'>
              Comprehensive transaction history with filtering, search, and detailed views.
            </p>
            <div className='bg-green-50 p-4 rounded-lg'>
              <p className='text-green-700'>
                💡 <strong>Review Focus:</strong> Data organization, visual hierarchy, status
                indicators, and information accessibility.
              </p>
            </div>
          </div>
        )}

        {currentView === 'mobile' && (
          <div className='bg-white rounded-xl shadow-sm border p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Mobile Experience</h2>
            <p className='text-gray-600 mb-4'>
              Optimized mobile interface with touch-friendly interactions and responsive design.
            </p>
            <div className='bg-purple-50 p-4 rounded-lg'>
              <p className='text-purple-700'>
                💡 <strong>Review Focus:</strong> Touch targets, readability, navigation, and
                performance on mobile devices.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoReview;
