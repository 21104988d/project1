import React from 'react';

// Layout Template Components

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Single Column Layout
export const SingleColumnLayout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-desktop mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

// Two Column Layout (60/40 split)
export interface TwoColumnLayoutProps {
  main: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ main, sidebar, className = '' }) => {
  return (
    <div className={`max-w-wide mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-desktop">
        <div className="lg:col-span-7">
          {main}
        </div>
        <div className="lg:col-span-5">
          {sidebar}
        </div>
      </div>
    </div>
  );
};

// Three Column Layout (25/50/25 split)
export interface ThreeColumnLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({ 
  left, 
  center, 
  right, 
  className = '' 
}) => {
  return (
    <div className={`max-w-ultra mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-desktop">
        <div className="lg:col-span-3">
          {left}
        </div>
        <div className="lg:col-span-6">
          {center}
        </div>
        <div className="lg:col-span-3">
          {right}
        </div>
      </div>
    </div>
  );
};

// Dashboard Grid Layout
export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-ultra mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-mobile sm:grid-cols-tablet lg:grid-cols-desktop gap-tablet lg:gap-desktop">
        {children}
      </div>
    </div>
  );
};

// Responsive Container Component
export interface ContainerProps {
  children: React.ReactNode;
  size?: 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'desktop', 
  className = '' 
}) => {
  const sizeClasses = {
    mobile: 'max-w-mobile',
    tablet: 'max-w-tablet',
    desktop: 'max-w-desktop',
    wide: 'max-w-wide',
    ultra: 'max-w-ultra',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// Grid Component with responsive columns
export interface GridProps {
  children: React.ReactNode;
  columns?: 'mobile' | 'tablet' | 'desktop' | 'auto';
  gap?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({ 
  children, 
  columns = 'auto', 
  gap = 'desktop', 
  className = '' 
}) => {
  const columnClasses = {
    mobile: 'grid-cols-mobile',
    tablet: 'grid-cols-tablet',
    desktop: 'grid-cols-desktop',
    auto: 'grid-cols-mobile sm:grid-cols-tablet lg:grid-cols-desktop',
  };

  const gapClasses = {
    mobile: 'gap-mobile',
    tablet: 'gap-tablet',
    desktop: 'gap-desktop',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};
