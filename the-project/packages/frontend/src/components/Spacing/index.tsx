import React from 'react';

// Spacing Utility Components

export interface SpacingProps {
  children?: React.ReactNode;
  className?: string;
}

// Spacer Components for Consistent Vertical Spacing
export const Spacer: React.FC<{
  size: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
}> = ({ size }) => {
  return <div className={`h-${size}`} />;
};

// Stack Component for Consistent Vertical Spacing
export interface StackProps {
  children: React.ReactNode;
  spacing?: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
  className?: string;
}

export const Stack: React.FC<StackProps> = ({ children, spacing = '4', className = '' }) => {
  return <div className={`space-y-${spacing} ${className}`}>{children}</div>;
};

// Inline Component for Consistent Horizontal Spacing
export interface InlineProps {
  children: React.ReactNode;
  spacing?: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
  className?: string;
}

export const Inline: React.FC<InlineProps> = ({ children, spacing = '4', className = '' }) => {
  return <div className={`flex flex-wrap gap-${spacing} ${className}`}>{children}</div>;
};

// Box Component with Consistent Padding
export interface BoxProps {
  children: React.ReactNode;
  padding?: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
  paddingX?: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
  paddingY?: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
  className?: string;
}

export const Box: React.FC<BoxProps> = ({
  children,
  padding,
  paddingX,
  paddingY,
  className = '',
}) => {
  let paddingClasses = '';

  if (padding) {
    paddingClasses = `p-${padding}`;
  } else {
    if (paddingX) paddingClasses += ` px-${paddingX}`;
    if (paddingY) paddingClasses += ` py-${paddingY}`;
  }

  return <div className={`${paddingClasses} ${className}`}>{children}</div>;
};

// Center Component for Easy Centering
export interface CenterProps {
  children: React.ReactNode;
  className?: string;
}

export const Center: React.FC<CenterProps> = ({ children, className = '' }) => {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
};

// Flex utility components
export interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24' | '32';
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  gap = '4',
  className = '',
}) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const wrapClass = wrap ? 'flex-wrap' : '';
  const gapClass = `gap-${gap}`;

  return (
    <div
      className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${wrapClass} ${gapClass} ${className}`}
    >
      {children}
    </div>
  );
};
