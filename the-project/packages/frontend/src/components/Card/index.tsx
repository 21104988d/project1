import React from 'react';

// Card Component Variants

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Base Card Component
export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = 'bg-surface-card rounded-lg shadow-card p-6';
  const interactiveClasses = onClick
    ? 'cursor-pointer hover:shadow-modal transition-shadow duration-200'
    : '';

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

// Interactive Card with Hover Effects
export const InteractiveCard: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-surface-card rounded-lg shadow-card hover:shadow-modal transition-all duration-200 p-6 cursor-pointer transform hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Elevated Card for Important Content
export const ElevatedCard: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface-card rounded-lg shadow-high p-6 ${className}`}>{children}</div>
  );
};

// Brand-styled Card
export const BrandCard: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg shadow-brand-lg p-6 text-white ${className}`}
    >
      {children}
    </div>
  );
};

// Card with Header, Content, and Footer
export interface StructuredCardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const StructuredCard: React.FC<StructuredCardProps> = ({
  header,
  children,
  footer,
  className = '',
  onClick,
}) => {
  const baseClasses = 'bg-surface-card rounded-lg shadow-card overflow-hidden';
  const interactiveClasses = onClick
    ? 'cursor-pointer hover:shadow-modal transition-shadow duration-200'
    : '';

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {header && <div className='p-6 border-b border-border-default'>{header}</div>}
      <div className='p-6'>{children}</div>
      {footer && (
        <div className='p-6 border-t border-border-default bg-surface-background'>{footer}</div>
      )}
    </div>
  );
};

// Surface Components for Different Elevations
export interface SurfaceProps {
  children: React.ReactNode;
  elevation?: 'none' | 'subtle' | 'card' | 'modal' | 'high';
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  elevation = 'card',
  rounded = 'lg',
  className = '',
}) => {
  const elevationClasses = {
    none: 'shadow-none',
    subtle: 'shadow-subtle',
    card: 'shadow-card',
    modal: 'shadow-modal',
    high: 'shadow-high',
  };

  const roundedClasses = {
    none: 'rounded-none',
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`bg-surface-card ${elevationClasses[elevation]} ${roundedClasses[rounded]} ${className}`}
    >
      {children}
    </div>
  );
};
