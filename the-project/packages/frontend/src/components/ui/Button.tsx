import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  success?: boolean;
  children: React.ReactNode;
}

/**
 * Button Component
 *
 * A comprehensive button component that implements the PayMe design system
 * with support for variants, sizes, states, and animations.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses = [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'border',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'transform',
    'hover:scale-[1.02]',
    'active:scale-[0.98]',
    'select-none',
  ].join(' ');

  // Variant-specific classes
  const variantClasses = {
    primary: [
      'bg-gradient-to-r',
      'from-brand-primary',
      'to-brand-secondary',
      'border-transparent',
      'text-white',
      'shadow-lg',
      'hover:shadow-xl',
      'hover:from-brand-secondary',
      'hover:to-brand-accent',
      'focus:ring-brand-primary',
      'disabled:from-gray-400',
      'disabled:to-gray-500',
      'disabled:cursor-not-allowed',
      'disabled:shadow-none',
    ].join(' '),

    secondary: [
      'bg-surface-card',
      'border-border-DEFAULT',
      'text-text-primary',
      'shadow-sm',
      'hover:bg-gray-50',
      'hover:border-gray-300',
      'hover:shadow-md',
      'focus:ring-brand-primary',
      'disabled:bg-gray-100',
      'disabled:text-gray-400',
      'disabled:cursor-not-allowed',
    ].join(' '),

    ghost: [
      'bg-transparent',
      'border-transparent',
      'text-text-secondary',
      'hover:bg-surface-card',
      'hover:text-text-primary',
      'focus:ring-brand-primary',
      'disabled:text-gray-400',
      'disabled:cursor-not-allowed',
    ].join(' '),

    danger: [
      'bg-semantic-error',
      'border-transparent',
      'text-white',
      'shadow-lg',
      'hover:bg-red-600',
      'hover:shadow-xl',
      'focus:ring-red-500',
      'disabled:bg-gray-400',
      'disabled:cursor-not-allowed',
    ].join(' '),
  };

  // Size-specific classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1',
    md: 'px-4 py-2 text-base rounded-lg gap-2',
    lg: 'px-6 py-3 text-lg rounded-lg gap-2',
    xl: 'px-8 py-4 text-xl rounded-xl gap-3',
  };

  // Loading state classes
  const loadingClasses = loading ? 'cursor-wait' : '';

  // Success state classes
  const successClasses = success ? 'bg-semantic-success border-semantic-success' : '';

  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    loadingClasses,
    successClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {/* Loading spinner */}
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
        </div>
      )}

      {/* Success checkmark */}
      {success && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        </div>
      )}

      {/* Button content */}
      <span
        className={`flex items-center gap-2 ${loading || success ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </span>
    </button>
  );
};

// Convenience components for common button patterns
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = props => (
  <Button variant='primary' {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = props => (
  <Button variant='secondary' {...props} />
);

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = props => (
  <Button variant='ghost' {...props} />
);

export const DangerButton: React.FC<Omit<ButtonProps, 'variant'>> = props => (
  <Button variant='danger' {...props} />
);
