import { useState } from 'react';
import { SwapInterface } from './components/SwapInterface/ModernSwapInterface';
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
import './styles/USDTDesignSystem.css';

function App() {
  const [currentPage, setCurrentPage] = useState('swap');
  const breakpoint = useBreakpoint();

  // Preload critical data for performance
  usePreloadCriticalData();

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'swap':
        return (
          <div className='swap-container'>
            <div className='swap-card'>
              <div className='swap-header'>
                <h2 className='swap-title'>Swap</h2>
                <button className='settings-button'>⚙️</button>
              </div>
              <SwapInterface />
            </div>
          </div>
        );
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
        return (
          <div className='swap-container'>
            <div className='swap-card'>
              <div className='swap-header'>
                <h2 className='swap-title'>Swap</h2>
                <button className='settings-button'>⚙️</button>
              </div>
              <SwapInterface />
            </div>
          </div>
        );
    }
  };

  return (
    <IJWErrorBoundary>
      <div className='app-container'>
        {/* Connection monitoring and performance indicators */}
        <ConnectionMonitor />
        <PerformanceMonitor />

        {/* PWA install prompt for mobile users */}
        {breakpoint === 'mobile' && <PWAInstallPrompt />}

        <header className='app-header'>
          <div className='nav-container'>
            <div className='nav-logo'>USDT Bridge</div>
            <nav>
              <ul className='nav-links'>
                <li>
                  <a
                    href='#'
                    className={`nav-link ${currentPage === 'swap' ? 'active' : ''}`}
                    onClick={() => handleNavigate('swap')}
                  >
                    Swap
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={`nav-link ${currentPage === 'portfolio' ? 'active' : ''}`}
                    onClick={() => handleNavigate('portfolio')}
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={`nav-link ${currentPage === 'history' ? 'active' : ''}`}
                    onClick={() => handleNavigate('history')}
                  >
                    History
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}
                    onClick={() => handleNavigate('analytics')}
                  >
                    Analytics
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className='app-main'>{renderCurrentPage()}</main>
      </div>
    </IJWErrorBoundary>
  );
}

export default App;
