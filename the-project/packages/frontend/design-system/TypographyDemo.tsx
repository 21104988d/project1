import React from 'react';
import { Typography, H1, H2, H3, Body, Small, Micro, Label, Code } from './Typography';

/**
 * Typography Demo Component
 *
 * A demonstration component that showcases all typography variants
 * and components. Useful for testing and visual validation.
 */
export const TypographyDemo: React.FC = () => {
  return (
    <div className='p-8 bg-surface-background min-h-screen'>
      <div className='max-w-4xl mx-auto space-y-12'>
        {/* Header Section */}
        <div className='space-y-4'>
          <Typography variant='hero' weight='bold' color='brand'>
            PayMe for Web3 Typography System
          </Typography>
          <Body color='secondary'>
            A comprehensive type system designed for clarity, accessibility, and brand consistency.
          </Body>
        </div>

        {/* Type Scale Demo */}
        <section className='space-y-8'>
          <H2>Type Scale Demonstration</H2>

          <div className='space-y-6'>
            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='display' weight='bold' className='mb-2'>
                Display Text (72px)
              </Typography>
              <Small color='tertiary'>Used for large marketing headlines</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='hero' weight='semibold' className='mb-2'>
                Hero Text (56px)
              </Typography>
              <Small color='tertiary'>Used for main page headlines</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='h1' weight='semibold' className='mb-2'>
                H1 Heading (36px)
              </Typography>
              <Small color='tertiary'>Used for page titles</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='h2' weight='semibold' className='mb-2'>
                H2 Heading (30px)
              </Typography>
              <Small color='tertiary'>Used for section headers</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='h3' weight='medium' className='mb-2'>
                H3 Heading (24px)
              </Typography>
              <Small color='tertiary'>Used for component headers</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='body-lg' weight='regular' className='mb-2'>
                Large Body Text (18px)
              </Typography>
              <Small color='tertiary'>Used for important body text and descriptions</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='regular' className='mb-2'>
                Body Text (16px)
              </Typography>
              <Small color='tertiary'>Used for default body text and paragraphs</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='small' weight='regular' className='mb-2'>
                Small Text (14px)
              </Typography>
              <Small color='tertiary'>Used for secondary information and labels</Small>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <Typography variant='micro' weight='regular' className='mb-2'>
                Micro Text (12px)
              </Typography>
              <Small color='tertiary'>Used for fine print and captions</Small>
            </div>
          </div>
        </section>

        {/* Predefined Components Demo */}
        <section className='space-y-6'>
          <H2>Predefined Components</H2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='p-6 bg-surface-card rounded-lg'>
              <H3 className='mb-4'>Heading Components</H3>
              <div className='space-y-3'>
                <H1>H1 Component</H1>
                <H2>H2 Component</H2>
                <H3>H3 Component</H3>
              </div>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <H3 className='mb-4'>Content Components</H3>
              <div className='space-y-3'>
                <Body>Body component for paragraphs</Body>
                <Small>Small component for secondary info</Small>
                <Micro>Micro component for fine print</Micro>
              </div>
            </div>

            <div className='p-6 bg-surface-card rounded-lg'>
              <H3 className='mb-4'>Specialized Components</H3>
              <div className='space-y-3'>
                <Label>Label component for forms</Label>
                <Code>Code component for technical text</Code>
              </div>
            </div>
          </div>
        </section>

        {/* Color Variations Demo */}
        <section className='space-y-6'>
          <H2>Color Variations</H2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='p-4 bg-surface-card rounded-lg'>
              <Body color='primary' className='mb-2'>
                Primary Color
              </Body>
              <Small color='tertiary'>Main content text</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Body color='secondary' className='mb-2'>
                Secondary Color
              </Body>
              <Small color='tertiary'>Supporting information</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Body color='tertiary' className='mb-2'>
                Tertiary Color
              </Body>
              <Small color='tertiary'>Fine print and captions</Small>
            </div>

            <div className='p-4 bg-brand-primary rounded-lg'>
              <Body color='inverse' className='mb-2'>
                Inverse Color
              </Body>
              <Small color='inverse'>Text on dark backgrounds</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Body color='brand' className='mb-2'>
                Brand Color
              </Body>
              <Small color='tertiary'>Highlights and CTAs</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Body color='success' className='mb-2'>
                Success Color
              </Body>
              <Small color='tertiary'>Success states</Small>
            </div>
          </div>
        </section>

        {/* Font Weight Demo */}
        <section className='space-y-6'>
          <H2>Font Weight Variations</H2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='p-4 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='light' className='mb-1'>
                Light (300)
              </Typography>
              <Small color='tertiary'>Delicate emphasis</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='regular' className='mb-1'>
                Regular (400)
              </Typography>
              <Small color='tertiary'>Default body text</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='medium' className='mb-1'>
                Medium (500)
              </Typography>
              <Small color='tertiary'>Subtle emphasis</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='semibold' className='mb-1'>
                Semibold (600)
              </Typography>
              <Small color='tertiary'>Strong emphasis</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='bold' className='mb-1'>
                Bold (700)
              </Typography>
              <Small color='tertiary'>Heavy emphasis</Small>
            </div>

            <div className='p-4 bg-surface-card rounded-lg'>
              <Typography variant='body' weight='black' className='mb-1'>
                Black (900)
              </Typography>
              <Small color='tertiary'>Maximum emphasis</Small>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className='space-y-6'>
          <H2>Real-world Examples</H2>

          {/* Transaction Card Example */}
          <div className='p-6 bg-surface-card rounded-lg border border-border-DEFAULT'>
            <div className='flex items-start justify-between mb-4'>
              <H3>Swap Transaction</H3>
              <Small color='success' weight='medium'>
                Confirmed
              </Small>
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between'>
                <Body>Amount:</Body>
                <Body weight='medium'>1,000.00 USDT</Body>
              </div>

              <div className='flex justify-between'>
                <Body>Received:</Body>
                <Body weight='medium'>999.50 USDC</Body>
              </div>

              <div className='flex justify-between'>
                <Small color='secondary'>Fee:</Small>
                <Small color='secondary'>0.50 USDT (0.05%)</Small>
              </div>

              <div className='pt-3 border-t border-border-DEFAULT'>
                <Small color='tertiary'>Transaction Hash:</Small>
                <Code className='block mt-1'>0x742d35cc5f59dbce834207e95b92d5e10e2b6e44</Code>
              </div>

              <Micro color='tertiary'>2 minutes ago • Ethereum Network</Micro>
            </div>
          </div>

          {/* Form Example */}
          <div className='p-6 bg-surface-card rounded-lg border border-border-DEFAULT'>
            <H3 className='mb-4'>Swap Interface</H3>

            <div className='space-y-4'>
              <div>
                <Label className='block mb-2'>From Token</Label>
                <div className='p-3 border border-border-DEFAULT rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <Body weight='medium'>USDT</Body>
                    <Small color='secondary'>Balance: 5,000.00</Small>
                  </div>
                </div>
              </div>

              <div>
                <Label className='block mb-2'>Amount</Label>
                <div className='p-3 border border-border-DEFAULT rounded-lg'>
                  <Typography variant='h3' weight='medium'>
                    1,000.00
                  </Typography>
                  <Small color='secondary'>≈ $1,000.00 USD</Small>
                </div>
              </div>

              <div>
                <Label className='block mb-2'>To Token</Label>
                <div className='p-3 border border-border-DEFAULT rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <Body weight='medium'>USDC</Body>
                    <Small color='secondary'>Balance: 2,500.00</Small>
                  </div>
                </div>
              </div>

              <div className='pt-4'>
                <div className='flex justify-between mb-2'>
                  <Small color='secondary'>Exchange Rate:</Small>
                  <Small color='secondary'>1 USDT = 0.9995 USDC</Small>
                </div>
                <div className='flex justify-between'>
                  <Small color='secondary'>Estimated Fee:</Small>
                  <Small color='secondary'>0.50 USDT (0.05%)</Small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='pt-8 border-t border-border-DEFAULT'>
          <Small color='tertiary'>Typography system v1.0.0 • Powered by Inter font family</Small>
        </footer>
      </div>
    </div>
  );
};

export default TypographyDemo;
