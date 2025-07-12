import { useState } from 'react';
import { SwapInterface } from './components/SwapInterface/SwapInterface';
import { USDTNavigation } from './components/Navigation/USDTNavigation';
import { UXShowcase } from './components/UX/UXShowcase';
import {
  ZeroCognitiveLoadContainer,
  ConnectionMonitor,
  IJWErrorBoundary,
  PerformanceMonitor,
  PWAInstallPrompt,
  usePreloadCriticalData,
  useBreakpoint,
} from './components/UX';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('swap');
  const breakpoint = useBreakpoint();

  // Preload critical data for performance
  usePreloadCriticalData();

  const handleSwap = (
    fromToken: string,
    fromChain: string,
    toToken: string,
    toChain: string,
    amount: string
  ) => {
    console.log('Swap initiated:', { fromToken, fromChain, toToken, toChain, amount });
    // Here you would integrate with actual swap logic
  };

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'swap':
        return <SwapInterface onSwap={handleSwap} />;
      case 'portfolio':
        return (
          <ZeroCognitiveLoadContainer
            title='Portfolio'
            subtitle='Track your USDT holdings across chains'
          >
            <p className='text-gray-600 dark:text-gray-400'>Portfolio management coming soon...</p>
          </ZeroCognitiveLoadContainer>
        );
      case 'history':
        return (
          <ZeroCognitiveLoadContainer
            title='Transaction History'
            subtitle='View your recent USDT transfers'
          >
            <p className='text-gray-600 dark:text-gray-400'>Transaction history coming soon...</p>
          </ZeroCognitiveLoadContainer>
        );
      case 'analytics':
        return (
          <ZeroCognitiveLoadContainer title='Analytics' subtitle='USDT market insights and trends'>
            <p className='text-gray-600 dark:text-gray-400'>Market analytics coming soon...</p>
          </ZeroCognitiveLoadContainer>
        );
      case 'ux-demo':
        return <UXShowcase />;
      default:
        return <SwapInterface onSwap={handleSwap} />;
    }
  };

  return (
    <IJWErrorBoundary>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        {/* Connection monitoring and performance indicators */}
        <ConnectionMonitor />
        <PerformanceMonitor />

        {/* PWA install prompt for mobile users */}
        {breakpoint === 'mobile' && <PWAInstallPrompt />}

        <USDTNavigation currentPage={currentPage} onNavigate={handleNavigate} />
        <main className='container mx-auto px-4 py-8'>{renderCurrentPage()}</main>
      </div>
    </IJWErrorBoundary>
  );
}

export default App;
