// Speed as a Core Feature Components
// Focus: Fast, responsive UI with performance monitoring

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Performance monitor component
interface PerformanceMetrics {
  responseTime: number;
  renderTime: number;
  quoteFreshness: number;
  connectionQuality: 'excellent' | 'good' | 'poor';
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    responseTime: 0,
    renderTime: 0,
    quoteFreshness: 0,
    connectionQuality: 'good',
  });

  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Measure initial render time
    const renderStart = performance.now();

    const measurePerformance = () => {
      const renderEnd = performance.now();
      setMetrics(prev => ({
        ...prev,
        renderTime: renderEnd - renderStart,
      }));
    };

    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(measurePerformance);

    // Monitor network performance
    const updateNetworkMetrics = async () => {
      const start = performance.now();
      try {
        await fetch('/api/health', { method: 'HEAD' });
        const responseTime = performance.now() - start;

        setMetrics(prev => ({
          ...prev,
          responseTime,
          connectionQuality:
            responseTime < 100 ? 'excellent' : responseTime < 300 ? 'good' : 'poor',
        }));
      } catch {
        setMetrics(prev => ({
          ...prev,
          connectionQuality: 'poor',
        }));
      }
    };

    updateNetworkMetrics();
    const interval = setInterval(updateNetworkMetrics, 10000);

    return () => clearInterval(interval);
  }, []);

  const getConnectionIcon = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return '🚀';
      case 'good':
        return '⚡';
      case 'poor':
        return '🐌';
      default:
        return '📶';
    }
  };

  return (
    <div className='speed-monitor'>
      <button
        onClick={() => setShowMetrics(!showMetrics)}
        className='speed-monitor__toggle'
        title='Performance Metrics'
      >
        {getConnectionIcon(metrics.connectionQuality)}
      </button>

      {showMetrics && (
        <div className='speed-monitor__panel'>
          <h4>Performance</h4>
          <div className='speed-metric'>
            <span>Response Time:</span>
            <span className={metrics.responseTime < 200 ? 'speed-good' : 'speed-poor'}>
              {Math.round(metrics.responseTime)}ms
            </span>
          </div>
          <div className='speed-metric'>
            <span>Render Time:</span>
            <span className={metrics.renderTime < 16 ? 'speed-good' : 'speed-poor'}>
              {Math.round(metrics.renderTime)}ms
            </span>
          </div>
          <div className='speed-metric'>
            <span>Connection:</span>
            <span className={`speed-${metrics.connectionQuality}`}>
              {metrics.connectionQuality}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Fast quote update component with optimistic updates
interface FastQuoteProps {
  fromToken: string;
  toToken: string;
  amount: string;
  onQuoteUpdate: (quote: any) => void;
}

export const FastQuote: React.FC<FastQuoteProps> = ({
  fromToken,
  toToken,
  amount,
  onQuoteUpdate,
}) => {
  const [quote, setQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [updateCount, setUpdateCount] = useState(0);

  // Debounced quote fetching
  const fetchQuote = useCallback(
    async (from: string, to: string, amt: string) => {
      if (!from || !to || !amt || parseFloat(amt) <= 0) return;

      setIsLoading(true);
      const startTime = performance.now();

      try {
        // Simulate fast API call - replace with actual quote fetching
        const response = await fetch('/api/quotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromToken: from,
            toToken: to,
            amount: amt,
          }),
        });

        const newQuote = await response.json();
        const responseTime = performance.now() - startTime;

        setQuote({
          ...newQuote,
          responseTime,
          timestamp: Date.now(),
        });
        setLastUpdate(new Date());
        setUpdateCount(prev => prev + 1);
        onQuoteUpdate(newQuote);
      } catch (error) {
        console.error('Quote fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [onQuoteUpdate]
  );

  // Auto-refresh quotes every 3 seconds
  useEffect(() => {
    fetchQuote(fromToken, toToken, amount);

    const interval = setInterval(() => {
      fetchQuote(fromToken, toToken, amount);
    }, 3000);

    return () => clearInterval(interval);
  }, [fromToken, toToken, amount, fetchQuote]);

  // Immediate update on input change (optimistic)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchQuote(fromToken, toToken, amount);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [fromToken, toToken, amount, fetchQuote]);

  const isQuoteFresh = quote && Date.now() - quote.timestamp < 5000;

  return (
    <div className='fast-quote'>
      <div className='fast-quote__header'>
        <div className='fast-quote__status'>
          {isLoading && <span className='fast-quote__loading'>🔄</span>}
          <span className={`fast-quote__freshness ${isQuoteFresh ? 'fresh' : 'stale'}`}>
            {isQuoteFresh ? '🟢' : '🟡'}
            {lastUpdate
              ? `Updated ${Math.round((Date.now() - lastUpdate.getTime()) / 1000)}s ago`
              : 'Loading...'}
          </span>
        </div>
        <div className='fast-quote__performance'>
          {quote?.responseTime && (
            <span className='fast-quote__response-time'>{Math.round(quote.responseTime)}ms</span>
          )}
          <span className='fast-quote__update-count'>#{updateCount}</span>
        </div>
      </div>

      {quote && (
        <div className='fast-quote__content'>
          <div className='fast-quote__rate'>
            <span className='fast-quote__amount'>{quote.outputAmount}</span>
            <span className='fast-quote__token'>{toToken}</span>
          </div>
          <div className='fast-quote__details'>
            <span className='fast-quote__exchange-rate'>
              1 {fromToken} = {quote.exchangeRate} {toToken}
            </span>
            <span
              className={`fast-quote__impact ${parseFloat(quote.priceImpact) > 3 ? 'high' : 'low'}`}
            >
              {quote.priceImpact}% impact
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Optimized list component with virtualization
interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  className = '',
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = useMemo(() => {
    return items.slice(visibleStart, visibleEnd).map((item, index) => ({
      item,
      index: visibleStart + index,
    }));
  }, [items, visibleStart, visibleEnd]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      className={`virtualized-list ${className}`}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Fast search with instant results
interface FastSearchProps {
  placeholder?: string;
  onSearch: (query: string) => Promise<any[]>;
  onSelect: (item: any) => void;
  renderResult: (item: any) => React.ReactNode;
  debounceMs?: number;
}

export const FastSearch: React.FC<FastSearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  onSelect,
  renderResult,
  debounceMs = 150,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchTime, setSearchTime] = useState<number | null>(null);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      const startTime = performance.now();

      try {
        const searchResults = await onSearch(searchQuery);
        const endTime = performance.now();

        setResults(searchResults);
        setSearchTime(endTime - startTime);
        setShowResults(true);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [onSearch]
  );

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch, debounceMs]);

  const handleSelect = (item: any) => {
    onSelect(item);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className='fast-search'>
      <div className='fast-search__input-container'>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className='fast-search__input'
          onFocus={() => query && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        {isSearching && <div className='fast-search__loading'>🔍</div>}
      </div>

      {showResults && (
        <div className='fast-search__results'>
          {searchTime && (
            <div className='fast-search__performance'>
              {Math.round(searchTime)}ms • {results.length} results
            </div>
          )}

          {results.length > 0 ? (
            <div className='fast-search__list'>
              {results.map((item, index) => (
                <div key={index} className='fast-search__result' onClick={() => handleSelect(item)}>
                  {renderResult(item)}
                </div>
              ))}
            </div>
          ) : (
            <div className='fast-search__empty'>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

// Preload critical resources
export const usePreloadCriticalData = () => {
  useEffect(() => {
    // Preload critical API endpoints
    const preloadEndpoints = ['/api/tokens', '/api/chains', '/api/health'];

    preloadEndpoints.forEach(endpoint => {
      fetch(endpoint, { method: 'HEAD' }).catch(() => {
        // Silent fail for preloading
      });
    });

    // Preload critical images
    const criticalImages = [
      '/assets/tokens/usdt.png',
      '/assets/tokens/usdc.png',
      '/assets/chains/ethereum.png',
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
};

// Performance-optimized memo wrapper
export const FastMemo = <T extends React.ComponentProps<any>>(
  Component: React.ComponentType<T>,
  areEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  return React.memo(Component, areEqual);
};
