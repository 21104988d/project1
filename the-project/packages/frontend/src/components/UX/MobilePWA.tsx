// Mobile-Optimized PWA Components
// Focus: Mobile-first design, touch interactions, and PWA features

import React, { useState, useEffect, useRef } from 'react';
import type { TouchEvent } from 'react';

// Touch-optimized swap interface
interface MobileSwapProps {
  onSwap: (fromToken: string, toToken: string, amount: string) => void;
  tokens: Array<{ symbol: string; name: string; icon: string }>;
}

export const MobileSwapInterface: React.FC<MobileSwapProps> = ({ onSwap, tokens }) => {
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  // Touch feedback for buttons
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleTouchStart = (buttonId: string) => {
    setPressedButton(buttonId);
    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleTouchEnd = () => {
    setPressedButton(null);
  };

  const handleSwap = async () => {
    setIsSwapping(true);
    try {
      await onSwap(fromToken, toToken, amount);
    } finally {
      setIsSwapping(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className='mobile-swap'>
      {/* Amount Input */}
      <div className='mobile-swap__input-section'>
        <label className='mobile-swap__label'>You Pay</label>
        <div className='mobile-swap__input-container'>
          <input
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='0.00'
            className='mobile-swap__amount-input'
            inputMode='decimal'
          />
          <select
            value={fromToken}
            onChange={e => setFromToken(e.target.value)}
            className='mobile-swap__token-select'
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Switch Button */}
      <div className='mobile-swap__switch-container'>
        <button
          onClick={switchTokens}
          className={`mobile-swap__switch-button ${
            pressedButton === 'switch' ? 'mobile-swap__switch-button--pressed' : ''
          }`}
          onTouchStart={() => handleTouchStart('switch')}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('switch')}
          onMouseUp={handleTouchEnd}
        >
          ↕️
        </button>
      </div>

      {/* Output Section */}
      <div className='mobile-swap__output-section'>
        <label className='mobile-swap__label'>You Receive</label>
        <div className='mobile-swap__output-container'>
          <div className='mobile-swap__output-amount'>
            {amount ? (parseFloat(amount) * 0.998).toFixed(6) : '0.00'}
          </div>
          <select
            value={toToken}
            onChange={e => setToToken(e.target.value)}
            className='mobile-swap__token-select'
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!amount || isSwapping}
        className={`mobile-swap__swap-button ${
          pressedButton === 'swap' ? 'mobile-swap__swap-button--pressed' : ''
        } ${!amount || isSwapping ? 'mobile-swap__swap-button--disabled' : ''}`}
        onTouchStart={() => handleTouchStart('swap')}
        onTouchEnd={handleTouchEnd}
        onMouseDown={() => handleTouchStart('swap')}
        onMouseUp={handleTouchEnd}
      >
        {isSwapping ? '🔄 Swapping...' : '🔄 Swap'}
      </button>
    </div>
  );
};

// Swipe gesture component
interface SwipeGestureProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export const SwipeGesture: React.FC<SwipeGestureProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isUpSwipe = distanceY > threshold;
    const isDownSwipe = distanceY < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp();
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown();
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
      className='swipe-gesture'
    >
      {children}
    </div>
  );
};

// Pull-to-refresh component
interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY === 0 || containerRef.current?.scrollTop !== 0) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    setPullDistance(distance);

    if (distance > 0) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
    setStartY(0);
  };

  const pullProgress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      className='pull-to-refresh'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className='pull-to-refresh__indicator'
        style={{
          transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
          opacity: pullProgress,
        }}
      >
        {isRefreshing ? (
          <div className='pull-spinner'>🔄</div>
        ) : (
          <div
            className='pull-arrow'
            style={{
              transform: `rotate(${pullProgress * 180}deg)`,
            }}
          >
            ↓
          </div>
        )}
      </div>
      <div
        style={{
          transform: `translateY(${Math.min(pullDistance * 0.5, threshold * 0.5)}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Mobile-optimized navigation
interface MobileNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: string;
    badge?: number;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className='mobile-nav'>
      <div className='mobile-nav__tabs'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`mobile-nav__tab ${activeTab === tab.id ? 'mobile-nav__tab--active' : ''}`}
          >
            <span className='mobile-nav__icon'>{tab.icon}</span>
            <span className='mobile-nav__label'>{tab.label}</span>
            {tab.badge && tab.badge > 0 && <span className='mobile-nav__badge'>{tab.badge}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
};

// PWA install prompt
export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setShowPrompt(false);
      }

      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Don't show if recently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className='pwa-install-prompt'>
      <div className='pwa-install-prompt__content'>
        <div className='pwa-install-prompt__icon'>📱</div>
        <div className='pwa-install-prompt__text'>
          <h3>Install App</h3>
          <p>Add to your home screen for a better experience</p>
        </div>
        <div className='pwa-install-prompt__actions'>
          <button onClick={handleInstall} className='pwa-install-prompt__install'>
            Install
          </button>
          <button onClick={handleDismiss} className='pwa-install-prompt__dismiss'>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Responsive breakpoint hook
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

// Touch-friendly button component
interface TouchButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  hapticFeedback?: boolean;
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  hapticFeedback = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    if (disabled) return;
    setIsPressed(true);
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      disabled={disabled}
      className={`touch-button touch-button--${variant} touch-button--${size} ${
        isPressed ? 'touch-button--pressed' : ''
      } ${disabled ? 'touch-button--disabled' : ''}`}
    >
      {children}
    </button>
  );
};
