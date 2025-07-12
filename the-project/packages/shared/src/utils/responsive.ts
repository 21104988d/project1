// Mobile-optimized responsive design utilities (for frontend or SSR usage)

// Type declarations for browser globals
declare const window: any;
declare const navigator: any;

export function isMobileUserAgent(userAgent: string): boolean {
  return /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Opera Mini/i.test(userAgent);
}

export function getResponsiveBreakpoint(width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
  if (width < 576) return 'xs';
  if (width < 768) return 'sm';
  if (width < 992) return 'md';
  if (width < 1200) return 'lg';
  return 'xl';
}

export function isTouchDevice(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0))
  );
}
