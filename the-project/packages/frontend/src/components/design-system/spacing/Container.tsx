/**
 * Container Component
 * Part of PayMe Design System Spacing System
 * Provides responsive container with max-width constraints
 */

import React from 'react';
import type { ContainerSize } from './spacing.types';
import { spacingConfig } from './spacing.config';

export interface ContainerProps {
  /** Container size variant */
  size?: ContainerSize;
  /** Additional CSS classes */
  className?: string;
  /** Container contents */
  children: React.ReactNode;
  /** Center the container horizontally */
  centered?: boolean;
  /** Apply horizontal padding */
  padded?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'desktop',
  className = '',
  children,
  centered = true,
  padded = true,
}) => {
  const maxWidth = spacingConfig.breakpoints.containers[size];

  const baseClasses = [
    'w-full',
    centered ? 'mx-auto' : '',
    padded ? 'px-4 sm:px-6 lg:px-8' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={baseClasses} style={{ maxWidth: `${maxWidth}px` }}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';
