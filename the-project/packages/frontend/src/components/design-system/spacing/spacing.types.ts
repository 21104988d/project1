/**
 * Spacing and Layout System Types
 * Part of PayMe Design System
 * Based on 8pt grid system for consistent spacing
 */

export type SpacingScale =
  | 'none' // 0px
  | 'xs' // 4px (0.5 * base)
  | 'sm' // 8px (1 * base)
  | 'md' // 16px (2 * base)
  | 'lg' // 24px (3 * base)
  | 'xl' // 32px (4 * base)
  | '2xl' // 48px (6 * base)
  | '3xl'; // 64px (8 * base)

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export type GridColumns = 4 | 8 | 12;

export type ContainerSize = 'mobile' | 'tablet' | 'desktop' | 'wide';

export type LayoutTemplate =
  | 'single' // Single column layout
  | 'two-column' // 60/40 split
  | 'three-column' // 25/50/25 split
  | 'dashboard'; // Multi-widget grid

export interface SpacingConfig {
  /** Base unit for 8pt grid system */
  base: number;
  /** Spacing scale values in pixels */
  scale: Record<SpacingScale, number>;
}

export interface BreakpointConfig {
  /** Breakpoint values in pixels */
  values: Record<Breakpoint, number>;
  /** Container max-widths for each breakpoint */
  containers: Record<ContainerSize, number>;
  /** Number of grid columns for each breakpoint */
  columns: Record<Breakpoint, GridColumns>;
  /** Gutter spacing for each breakpoint */
  gutters: Record<Breakpoint, number>;
}

export interface LayoutConfig {
  /** Available layout templates */
  templates: Record<
    LayoutTemplate,
    {
      name: string;
      description: string;
      columns: string[];
      useCase: string;
    }
  >;
}

export interface SpacingSystemConfig {
  spacing: SpacingConfig;
  breakpoints: BreakpointConfig;
  layouts: LayoutConfig;
}
