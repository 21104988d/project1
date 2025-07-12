// "It Just Works" Reliability Standards
// Focus: Self-healing, graceful degradation, and seamless experience

import React, { useEffect, useState, useCallback } from 'react';

// Connection status monitor with auto-recovery
export const ConnectionMonitor: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiHealth, setApiHealth] = useState<'healthy' | 'degraded' | 'offline'>('healthy');
  const [retryCount, setRetryCount] = useState(0);

  const checkApiHealth = useCallback(async () => {
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        timeout: 5000,
      } as RequestInit);

      if (response.ok) {
        setApiHealth('healthy');
        setRetryCount(0);
      } else {
        setApiHealth('degraded');
      }
    } catch {
      setApiHealth('offline');
      setRetryCount(prev => prev + 1);

      // Auto-retry with exponential backoff
      if (retryCount < 5) {
        setTimeout(() => checkApiHealth(), Math.min(1000 * Math.pow(2, retryCount), 30000));
      }
    }
  }, [retryCount]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check API health every 30 seconds
    const healthCheck = setInterval(checkApiHealth, 30000);
    checkApiHealth(); // Initial check

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(healthCheck);
    };
  }, [checkApiHealth]);

  if (!isOnline) {
    return (
      <div className='ijw-status ijw-status--offline'>
        <span className='ijw-status__icon'>📶</span>
        <span>Working offline - Changes will sync when reconnected</span>
      </div>
    );
  }

  if (apiHealth === 'offline') {
    return (
      <div className='ijw-status ijw-status--error'>
        <span className='ijw-status__icon'>🔄</span>
        <span>Reconnecting... (Attempt {retryCount}/5)</span>
      </div>
    );
  }

  if (apiHealth === 'degraded') {
    return (
      <div className='ijw-status ijw-status--warning'>
        <span className='ijw-status__icon'>⚡</span>
        <span>Service running slower than usual</span>
      </div>
    );
  }

  return null; // Hidden when everything is working
};

// Auto-saving form wrapper
interface AutoSaveWrapperProps {
  children: React.ReactNode;
  onSave: (data: any) => Promise<void>;
  data: any;
  saveInterval?: number;
}

export const AutoSaveWrapper: React.FC<AutoSaveWrapperProps> = ({
  children,
  onSave,
  data,
  saveInterval = 3000,
}) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const saveData = async () => {
      if (!data || isSaving) return;

      setIsSaving(true);
      setSaveError(null);

      try {
        await onSave(data);
        setLastSaved(new Date());
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Save failed');
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    };

    const timer = setTimeout(saveData, saveInterval);
    return () => clearTimeout(timer);
  }, [data, onSave, saveInterval, isSaving]);

  return (
    <div className='ijw-autosave-wrapper'>
      {children}
      <div className='ijw-autosave-status'>
        {isSaving && (
          <span className='ijw-autosave-indicator ijw-autosave--saving'>💾 Saving...</span>
        )}
        {lastSaved && !isSaving && !saveError && (
          <span className='ijw-autosave-indicator ijw-autosave--saved'>
            ✅ Saved {lastSaved.toLocaleTimeString()}
          </span>
        )}
        {saveError && (
          <span className='ijw-autosave-indicator ijw-autosave--error'>❌ {saveError}</span>
        )}
      </div>
    </div>
  );
};

// Graceful error boundary with recovery options
interface IJWErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class IJWErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  IJWErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): IJWErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log to monitoring service
    console.error('IJW Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='ijw-error-boundary'>
          <div className='ijw-error-content'>
            <h2>Something went wrong</h2>
            <p>Don't worry - your data is safe. Let's get you back on track.</p>

            <div className='ijw-error-actions'>
              <button onClick={this.handleRetry} className='ijw-button ijw-button--primary'>
                Try Again
              </button>
              <button onClick={this.handleRefresh} className='ijw-button ijw-button--secondary'>
                Refresh Page
              </button>
            </div>

            <details className='ijw-error-details'>
              <summary>Technical Details</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Smart loading states that don't annoy users
interface SmartLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  minimumTime?: number; // Prevent flash of loading state
  skeletonCount?: number;
}

export const SmartLoading: React.FC<SmartLoadingProps> = ({
  isLoading,
  children,
  minimumTime = 200,
  skeletonCount = 3,
}) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), minimumTime);
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, minimumTime]);

  if (isLoading && showLoading) {
    return (
      <div className='ijw-smart-loading'>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className='ijw-skeleton'>
            <div className='ijw-skeleton__line ijw-skeleton__line--title'></div>
            <div className='ijw-skeleton__line ijw-skeleton__line--content'></div>
            <div className='ijw-skeleton__line ijw-skeleton__line--content ijw-skeleton__line--short'></div>
          </div>
        ))}
      </div>
    );
  }

  return <>{children}</>;
};

// Offline-first data management
export const useOfflineFirst = <T,>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    staleTime?: number;
    refetchOnReconnect?: boolean;
  } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { staleTime = 5 * 60 * 1000, refetchOnReconnect = true } = options;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check for cached data first
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < staleTime) {
          setData(cachedData);
          setIsLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetcher();
      setData(freshData);

      // Cache the result
      localStorage.setItem(
        key,
        JSON.stringify({
          data: freshData,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));

      // Fall back to cached data if available
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data: cachedData } = JSON.parse(cached);
        setData(cachedData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, staleTime]);

  useEffect(() => {
    fetchData();

    if (refetchOnReconnect) {
      const handleOnline = () => fetchData();
      window.addEventListener('online', handleOnline);
      return () => window.removeEventListener('online', handleOnline);
    }
  }, [fetchData, refetchOnReconnect]);

  return { data, isLoading, error, refetch: fetchData };
};
