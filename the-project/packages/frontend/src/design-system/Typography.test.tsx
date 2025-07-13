import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Typography,
  H1,
  H2,
  H3,
  Body,
  Small,
  Micro,
  Label,
  Code,
  typographyUtils,
} from './Typography';

describe('Typography Component', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(<Typography>Test content</Typography>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Typography>Default text</Typography>);
      const element = screen.getByText('Default text');
      expect(element).toHaveClass('font-sans', 'text-body', 'font-regular', 'text-text-primary');
    });

    it('uses span as default element', () => {
      render(<Typography>Span text</Typography>);
      const element = screen.getByText('Span text');
      expect(element.tagName).toBe('SPAN');
    });
  });

  describe('Variant Prop', () => {
    it('applies display variant classes', () => {
      render(<Typography variant='display'>Display text</Typography>);
      const element = screen.getByText('Display text');
      expect(element).toHaveClass('text-display');
    });

    it('applies hero variant classes', () => {
      render(<Typography variant='hero'>Hero text</Typography>);
      const element = screen.getByText('Hero text');
      expect(element).toHaveClass('text-hero');
    });

    it('applies heading variant classes', () => {
      render(<Typography variant='h1'>H1 text</Typography>);
      const element = screen.getByText('H1 text');
      expect(element).toHaveClass('text-h1');
    });

    it('applies body variant classes', () => {
      render(<Typography variant='body-lg'>Large body text</Typography>);
      const element = screen.getByText('Large body text');
      expect(element).toHaveClass('text-body-lg');
    });

    it('applies small text variant classes', () => {
      render(<Typography variant='small'>Small text</Typography>);
      const element = screen.getByText('Small text');
      expect(element).toHaveClass('text-small');
    });

    it('applies micro text variant classes', () => {
      render(<Typography variant='micro'>Micro text</Typography>);
      const element = screen.getByText('Micro text');
      expect(element).toHaveClass('text-micro');
    });
  });

  describe('Weight Prop', () => {
    const weights = ['light', 'regular', 'medium', 'semibold', 'bold', 'black'] as const;

    weights.forEach(weight => {
      it(`applies ${weight} weight class`, () => {
        render(<Typography weight={weight}>{weight} text</Typography>);
        const element = screen.getByText(`${weight} text`);
        expect(element).toHaveClass(`font-${weight}`);
      });
    });
  });

  describe('Font Family Prop', () => {
    it('applies sans font family class', () => {
      render(<Typography family='sans'>Sans text</Typography>);
      const element = screen.getByText('Sans text');
      expect(element).toHaveClass('font-sans');
    });

    it('applies mono font family class', () => {
      render(<Typography family='mono'>Mono text</Typography>);
      const element = screen.getByText('Mono text');
      expect(element).toHaveClass('font-mono');
    });
  });

  describe('Color Prop', () => {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'inverse',
      'brand',
      'success',
      'warning',
      'error',
      'info',
    ] as const;

    colors.forEach(color => {
      it(`applies ${color} color class`, () => {
        const expectedClass = ['success', 'warning', 'error', 'info'].includes(color)
          ? `text-${color}`
          : `text-text-${color}`;

        render(<Typography color={color}>{color} text</Typography>);
        const element = screen.getByText(`${color} text`);
        expect(element).toHaveClass(expectedClass);
      });
    });
  });

  describe('Line Height Prop', () => {
    const lineHeights = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'] as const;

    lineHeights.forEach(lineHeight => {
      it(`applies ${lineHeight} line height class`, () => {
        render(<Typography lineHeight={lineHeight}>{lineHeight} text</Typography>);
        const element = screen.getByText(`${lineHeight} text`);
        expect(element).toHaveClass(`leading-${lineHeight}`);
      });
    });
  });

  describe('Letter Spacing Prop', () => {
    const letterSpacings = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'] as const;

    letterSpacings.forEach(letterSpacing => {
      it(`applies ${letterSpacing} letter spacing class`, () => {
        render(<Typography letterSpacing={letterSpacing}>{letterSpacing} text</Typography>);
        const element = screen.getByText(`${letterSpacing} text`);
        expect(element).toHaveClass(`tracking-${letterSpacing}`);
      });
    });
  });

  describe('Custom Element Prop', () => {
    it('renders as h1 when as="h1"', () => {
      render(<Typography as='h1'>Heading text</Typography>);
      const element = screen.getByText('Heading text');
      expect(element.tagName).toBe('H1');
    });

    it('renders as p when as="p"', () => {
      render(<Typography as='p'>Paragraph text</Typography>);
      const element = screen.getByText('Paragraph text');
      expect(element.tagName).toBe('P');
    });

    it('renders as button when as="button"', () => {
      render(<Typography as='button'>Button text</Typography>);
      const element = screen.getByText('Button text');
      expect(element.tagName).toBe('BUTTON');
    });
  });

  describe('Custom Classes', () => {
    it('appends custom className', () => {
      render(<Typography className='custom-class'>Custom text</Typography>);
      const element = screen.getByText('Custom text');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('font-sans'); // Still has default classes
    });

    it('handles multiple custom classes', () => {
      render(<Typography className='class-one class-two'>Multi class text</Typography>);
      const element = screen.getByText('Multi class text');
      expect(element).toHaveClass('class-one', 'class-two');
    });
  });

  describe('Complex Combinations', () => {
    it('applies all props correctly', () => {
      render(
        <Typography
          variant='h2'
          weight='bold'
          family='sans'
          color='brand'
          lineHeight='tight'
          letterSpacing='wide'
          as='h2'
          className='custom-heading'
        >
          Complex heading
        </Typography>
      );

      const element = screen.getByText('Complex heading');
      expect(element).toHaveClass(
        'font-sans',
        'text-h2',
        'font-bold',
        'text-text-brand',
        'leading-tight',
        'tracking-wide',
        'custom-heading'
      );
      expect(element.tagName).toBe('H2');
    });
  });
});

describe('Predefined Typography Components', () => {
  describe('H1 Component', () => {
    it('renders with correct defaults', () => {
      render(<H1>Heading 1</H1>);
      const element = screen.getByText('Heading 1');
      expect(element).toHaveClass('text-h1', 'font-semibold');
      expect(element.tagName).toBe('H1');
    });

    it('allows prop overrides', () => {
      render(
        <H1 weight='bold' color='brand'>
          Bold H1
        </H1>
      );
      const element = screen.getByText('Bold H1');
      expect(element).toHaveClass('font-bold', 'text-text-brand');
    });
  });

  describe('H2 Component', () => {
    it('renders with correct defaults', () => {
      render(<H2>Heading 2</H2>);
      const element = screen.getByText('Heading 2');
      expect(element).toHaveClass('text-h2', 'font-semibold');
      expect(element.tagName).toBe('H2');
    });
  });

  describe('H3 Component', () => {
    it('renders with correct defaults', () => {
      render(<H3>Heading 3</H3>);
      const element = screen.getByText('Heading 3');
      expect(element).toHaveClass('text-h3', 'font-medium');
      expect(element.tagName).toBe('H3');
    });
  });

  describe('Body Component', () => {
    it('renders with correct defaults', () => {
      render(<Body>Body text</Body>);
      const element = screen.getByText('Body text');
      expect(element).toHaveClass('text-body', 'font-regular');
    });
  });

  describe('Small Component', () => {
    it('renders with correct defaults', () => {
      render(<Small>Small text</Small>);
      const element = screen.getByText('Small text');
      expect(element).toHaveClass('text-small', 'font-regular', 'text-text-secondary');
    });
  });

  describe('Micro Component', () => {
    it('renders with correct defaults', () => {
      render(<Micro>Micro text</Micro>);
      const element = screen.getByText('Micro text');
      expect(element).toHaveClass('text-micro', 'font-regular', 'text-text-tertiary');
    });
  });

  describe('Label Component', () => {
    it('renders with correct defaults', () => {
      render(<Label>Label text</Label>);
      const element = screen.getByText('Label text');
      expect(element).toHaveClass('text-small', 'font-medium');
      expect(element.tagName).toBe('LABEL');
    });
  });

  describe('Code Component', () => {
    it('renders with correct defaults', () => {
      render(<Code>Code text</Code>);
      const element = screen.getByText('Code text');
      expect(element).toHaveClass('text-small', 'font-mono');
      expect(element.tagName).toBe('CODE');
    });
  });
});

describe('Typography Utilities', () => {
  describe('getClasses', () => {
    it('returns correct classes for basic config', () => {
      const classes = typographyUtils.getClasses({
        variant: 'h1',
        weight: 'bold',
        color: 'brand',
      });

      expect(classes).toBe('text-h1 font-bold font-sans text-text-brand');
    });

    it('includes optional line height and letter spacing', () => {
      const classes = typographyUtils.getClasses({
        variant: 'body',
        lineHeight: 'relaxed',
        letterSpacing: 'wide',
      });

      expect(classes).toBe(
        'text-body font-regular font-sans text-text-primary leading-relaxed tracking-wide'
      );
    });

    it('handles empty config with defaults', () => {
      const classes = typographyUtils.getClasses({});
      expect(classes).toBe('text-body font-regular font-sans text-text-primary');
    });
  });

  describe('isHeading', () => {
    it('returns true for heading variants', () => {
      expect(typographyUtils.isHeading('display')).toBe(true);
      expect(typographyUtils.isHeading('hero')).toBe(true);
      expect(typographyUtils.isHeading('h1')).toBe(true);
      expect(typographyUtils.isHeading('h2')).toBe(true);
      expect(typographyUtils.isHeading('h3')).toBe(true);
    });

    it('returns false for non-heading variants', () => {
      expect(typographyUtils.isHeading('body')).toBe(false);
      expect(typographyUtils.isHeading('body-lg')).toBe(false);
      expect(typographyUtils.isHeading('small')).toBe(false);
      expect(typographyUtils.isHeading('micro')).toBe(false);
    });
  });

  describe('getSemanticElement', () => {
    it('returns correct semantic elements for variants', () => {
      expect(typographyUtils.getSemanticElement('display')).toBe('h1');
      expect(typographyUtils.getSemanticElement('hero')).toBe('h1');
      expect(typographyUtils.getSemanticElement('h1')).toBe('h1');
      expect(typographyUtils.getSemanticElement('h2')).toBe('h2');
      expect(typographyUtils.getSemanticElement('h3')).toBe('h3');
      expect(typographyUtils.getSemanticElement('body')).toBe('p');
      expect(typographyUtils.getSemanticElement('body-lg')).toBe('p');
      expect(typographyUtils.getSemanticElement('small')).toBe('span');
      expect(typographyUtils.getSemanticElement('micro')).toBe('span');
    });
  });

  describe('getContrastColor', () => {
    it('returns inverse for dark backgrounds', () => {
      expect(typographyUtils.getContrastColor('#FF006E')).toBe('inverse');
      expect(typographyUtils.getContrastColor('#FB3085')).toBe('inverse');
      expect(typographyUtils.getContrastColor('#8B5FBF')).toBe('inverse');
    });

    it('returns primary for light backgrounds', () => {
      expect(typographyUtils.getContrastColor('#FFFFFF')).toBe('primary');
      expect(typographyUtils.getContrastColor('#FAFAFA')).toBe('primary');
      expect(typographyUtils.getContrastColor('#F0F0F0')).toBe('primary');
    });
  });
});

describe('Accessibility', () => {
  it('maintains semantic structure with heading components', () => {
    render(
      <div>
        <H1>Main Title</H1>
        <H2>Section Title</H2>
        <H3>Subsection Title</H3>
        <Body>Content paragraph</Body>
      </div>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection Title');
  });

  it('supports custom ARIA attributes', () => {
    render(
      <Typography aria-label='Custom label' role='button'>
        Accessible text
      </Typography>
    );

    const element = screen.getByLabelText('Custom label');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('role', 'button');
  });
});
