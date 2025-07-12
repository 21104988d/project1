// Zero Cognitive Load Interface Components
// Focus: Simplicity, clarity, and minimal mental effort required

import React from 'react';

interface ZeroCognitiveLoadProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

// Main container that enforces zero cognitive load principles
export const ZeroCognitiveLoadContainer: React.FC<ZeroCognitiveLoadProps> = ({
  children,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`zcl-container ${className}`}>
      {title && (
        <div className='zcl-header'>
          <h1 className='zcl-title'>{title}</h1>
          {subtitle && <p className='zcl-subtitle'>{subtitle}</p>}
        </div>
      )}
      <div className='zcl-content'>{children}</div>
    </div>
  );
};

// Single-purpose button with clear action
interface ZCLButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

export const ZCLButton: React.FC<ZCLButtonProps> = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`zcl-button zcl-button--${variant} zcl-button--${size} ${
        loading ? 'zcl-button--loading' : ''
      }`}
      aria-busy={loading}
    >
      {loading ? <span className='zcl-spinner' aria-hidden='true' /> : children}
    </button>
  );
};

// Simple status indicator
interface ZCLStatusProps {
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details?: string;
}

export const ZCLStatus: React.FC<ZCLStatusProps> = ({ status, message, details }) => {
  const getIcon = () => {
    switch (status) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
    }
  };

  return (
    <div className={`zcl-status zcl-status--${status}`}>
      <span className='zcl-status__icon' aria-hidden='true'>
        {getIcon()}
      </span>
      <div className='zcl-status__content'>
        <p className='zcl-status__message'>{message}</p>
        {details && <p className='zcl-status__details'>{details}</p>}
      </div>
    </div>
  );
};

// Progressive disclosure for advanced options
interface ZCLProgressiveDisclosureProps {
  triggerText: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const ZCLProgressiveDisclosure: React.FC<ZCLProgressiveDisclosureProps> = ({
  triggerText,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className='zcl-disclosure'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='zcl-disclosure__trigger'
        aria-expanded={isOpen}
      >
        {triggerText}
        <span className={`zcl-disclosure__arrow ${isOpen ? 'zcl-disclosure__arrow--open' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className='zcl-disclosure__content'>{children}</div>}
    </div>
  );
};
