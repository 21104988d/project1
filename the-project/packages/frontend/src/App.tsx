import { SwapInterface } from './components/SwapInterface/ModernSwapInterface';
import {
  ConnectionMonitor,
  IJWErrorBoundary,
  PerformanceMonitor,
  PWAInstallPrompt,
  usePreloadCriticalData,
  useBreakpoint,
} from './components/UX';
import './App.css';
import './styles/USDTDesignSystem.css';
import './styles/design-system-utilities.css';

function App() {
  const breakpoint = useBreakpoint();

  // Preload critical data for performance
  usePreloadCriticalData();

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
            <div className='nav-logo'>
              <div className='logo-symbol'>🦅</div>
              <div className='logo-text'>
                <div className='brand-name'>Project</div>
                <div className='brand-tagline'>DeFi Swap</div>
              </div>
            </div>
            <div className='nav-actions'>
              <button className='connect-wallet-btn'>Connect Wallet</button>
            </div>
          </div>
        </header>

        <main className='app-main'>
          <div className='swap-container'>
            <div className='swap-card'>
              <div className='swap-header'>
                <h2 className='swap-title'>Swap Tokens</h2>
                <button className='settings-button'>⚙️</button>
              </div>
              <SwapInterface />
            </div>
          </div>
        </main>
      </div>
    </IJWErrorBoundary>
  );
}

export default App;
