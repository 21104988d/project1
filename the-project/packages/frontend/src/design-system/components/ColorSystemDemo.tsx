import React from 'react';
import { colors } from '../tokens/colors';

interface ColorSwatchProps {
  color: string;
  name: string;
  description?: string;
  textColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  color, 
  name, 
  description, 
  textColor = '#000000' 
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div 
      className="group cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={copyToClipboard}
    >
      <div 
        className="h-20 w-full rounded-lg shadow-card mb-2 flex items-end p-3"
        style={{ backgroundColor: color }}
      >
        <span 
          className="text-xs font-mono opacity-80 group-hover:opacity-100"
          style={{ color: textColor }}
        >
          {color}
        </span>
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-text-primary">{name}</h4>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>
    </div>
  );
};

const ColorSystemDemo: React.FC = () => {
  return (
    <div className="p-8 bg-surface-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gradient-brand mb-4">
            PayMe-Inspired Color System
          </h1>
          <p className="text-text-secondary text-lg">
            A vibrant, accessible color palette for modern fintech applications.
            Click any color to copy its value.
          </p>
        </header>

        {/* Brand Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorSwatch
              color={colors.brand.primary}
              name="Primary Pink"
              description="Main brand color for primary actions"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.brand.secondary}
              name="Secondary Magenta"
              description="Supporting brand color for secondary actions"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.brand.accent}
              name="Accent Purple"
              description="Tertiary brand color for accents"
              textColor="#FFFFFF"
            />
          </div>
        </section>

        {/* Stablecoin Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Stablecoin Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorSwatch
              color={colors.stablecoin.usdt}
              name="USDT Green"
              description="Tether USD token color"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.stablecoin.usdc}
              name="USDC Blue"
              description="USD Coin token color"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.stablecoin.dai}
              name="DAI Orange"
              description="Dai stablecoin token color"
              textColor="#000000"
            />
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Semantic Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ColorSwatch
              color={colors.semantic.success}
              name="Success"
              description="Success states and confirmations"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.semantic.warning}
              name="Warning"
              description="Warning states and attention"
              textColor="#000000"
            />
            <ColorSwatch
              color={colors.semantic.error}
              name="Error"
              description="Error states and failures"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.semantic.info}
              name="Info"
              description="Information and neutral states"
              textColor="#FFFFFF"
            />
          </div>
        </section>

        {/* Surface Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Surface Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ColorSwatch
              color={colors.surface.background}
              name="Background"
              description="Main application background"
              textColor="#000000"
            />
            <ColorSwatch
              color={colors.surface.card}
              name="Card"
              description="Card and elevated surface background"
              textColor="#000000"
            />
          </div>
        </section>

        {/* Text Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Text Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ColorSwatch
              color={colors.text.primary}
              name="Primary Text"
              description="Headlines and primary content"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.text.secondary}
              name="Secondary Text"
              description="Supporting text and descriptions"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.text.tertiary}
              name="Tertiary Text"
              description="Placeholder and subtle text"
              textColor="#FFFFFF"
            />
            <ColorSwatch
              color={colors.text.brand}
              name="Brand Text"
              description="Links and brand text elements"
              textColor="#FFFFFF"
            />
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Buttons</h3>
              <div className="space-y-3">
                <button className="btn-brand px-6 py-3 rounded-lg font-semibold">
                  Primary Button
                </button>
                <button className="px-6 py-3 rounded-lg font-semibold border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200">
                  Secondary Button
                </button>
                <button className="px-6 py-3 rounded-lg font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200">
                  Ghost Button
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Cards</h3>
              <div className="card-brand p-6">
                <h4 className="font-semibold text-text-primary mb-2">Token Balance</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold" style={{ color: colors.stablecoin.usdt }}>
                    1,234.56
                  </span>
                  <span className="text-text-secondary">USDT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Gradient Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="h-32 rounded-xl flex items-center justify-center"
              style={{ background: colors.gradient.primary }}
            >
              <span className="text-white font-semibold text-lg">Brand Gradient</span>
            </div>
            <div 
              className="h-32 rounded-xl flex items-center justify-center border-2"
              style={{ 
                background: colors.gradient.card,
                borderColor: colors.border.default 
              }}
            >
              <span className="text-text-primary font-semibold text-lg">Card Gradient</span>
            </div>
          </div>
        </section>

        {/* Accessibility Note */}
        <section className="bg-surface-card p-6 rounded-xl border border-border-default">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Accessibility Compliance
          </h3>
          <p className="text-text-secondary">
            All color combinations in this system meet WCAG AA accessibility standards 
            with contrast ratios of at least 4.5:1 for normal text and 3:1 for large text. 
            Colors are tested for color blindness compatibility and high contrast mode support.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ColorSystemDemo;
