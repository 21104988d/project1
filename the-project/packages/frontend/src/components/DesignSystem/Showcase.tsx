import React from 'react';
import { Card, InteractiveCard, ElevatedCard, BrandCard, StructuredCard } from '../Card';
import { Container, Grid, SingleColumnLayout, TwoColumnLayout } from '../Layout';
import { Stack, Inline, Box, Center, Flex, Spacer } from '../Spacing';

// Design System Showcase Component
export const DesignSystemShowcase: React.FC = () => {
  return (
    <div className='min-h-screen bg-surface-background'>
      {/* Header */}
      <div className='bg-surface-card shadow-card'>
        <Container size='wide'>
          <Box paddingY='6'>
            <h1 className='text-3xl font-bold text-text-primary'>Design System Showcase</h1>
            <p className='text-text-secondary mt-2'>
              Complete design token system with spacing, layout, and surface components
            </p>
          </Box>
        </Container>
      </div>

      <Spacer size='8' />

      <Container size='wide'>
        <Stack spacing='12'>
          {/* Spacing System */}
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-6'>
              Spacing System (8pt Grid)
            </h2>
            <Grid columns='auto' gap='desktop'>
              <Card>
                <h3 className='text-lg font-medium mb-4'>Stack Component</h3>
                <Stack spacing='4'>
                  <div className='bg-brand-primary rounded-md p-4 text-white'>Item 1</div>
                  <div className='bg-brand-secondary rounded-md p-4 text-white'>Item 2</div>
                  <div className='bg-brand-accent rounded-md p-4 text-white'>Item 3</div>
                </Stack>
              </Card>

              <Card>
                <h3 className='text-lg font-medium mb-4'>Inline Component</h3>
                <Inline spacing='4'>
                  <div className='bg-stablecoin-usdt rounded-md p-4 text-white'>USDT</div>
                  <div className='bg-stablecoin-usdc rounded-md p-4 text-white'>USDC</div>
                  <div className='bg-stablecoin-dai rounded-md p-4 text-white'>DAI</div>
                </Inline>
              </Card>

              <Card>
                <h3 className='text-lg font-medium mb-4'>Flex Component</h3>
                <Flex justify='between' align='center' gap='4'>
                  <div className='bg-semantic-success rounded-md p-4 text-white flex-1'>
                    Success
                  </div>
                  <div className='bg-semantic-warning rounded-md p-4 text-white flex-1'>
                    Warning
                  </div>
                  <div className='bg-semantic-error rounded-md p-4 text-white flex-1'>Error</div>
                </Flex>
              </Card>
            </Grid>
          </section>

          {/* Card System */}
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-6'>Card System</h2>
            <Grid columns='auto' gap='desktop'>
              <Card>
                <h3 className='text-lg font-medium mb-2'>Base Card</h3>
                <p className='text-text-secondary'>Standard card with subtle shadow and padding</p>
              </Card>

              <InteractiveCard onClick={() => alert('Interactive card clicked!')}>
                <h3 className='text-lg font-medium mb-2'>Interactive Card</h3>
                <p className='text-text-secondary'>Hover to see elevation and transform effects</p>
              </InteractiveCard>

              <ElevatedCard>
                <h3 className='text-lg font-medium mb-2'>Elevated Card</h3>
                <p className='text-text-secondary'>High elevation for important content</p>
              </ElevatedCard>

              <BrandCard>
                <h3 className='text-lg font-medium mb-2'>Brand Card</h3>
                <p className='text-white opacity-90'>Gradient background with brand colors</p>
              </BrandCard>
            </Grid>
          </section>

          {/* Structured Card */}
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-6'>Structured Card</h2>
            <StructuredCard
              header={
                <div>
                  <h3 className='text-lg font-medium'>Transaction Details</h3>
                  <p className='text-text-secondary text-sm'>Swap USDT to USDC</p>
                </div>
              }
              footer={
                <Flex justify='between' align='center'>
                  <span className='text-text-secondary text-sm'>Gas Fee: $2.50</span>
                  <button className='bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-hover-primary transition-colors'>
                    Confirm
                  </button>
                </Flex>
              }
            >
              <Stack spacing='4'>
                <Flex justify='between'>
                  <span>From:</span>
                  <span className='font-medium'>1,000 USDT</span>
                </Flex>
                <Flex justify='between'>
                  <span>To:</span>
                  <span className='font-medium'>999.5 USDC</span>
                </Flex>
                <Flex justify='between'>
                  <span>Rate:</span>
                  <span className='font-medium'>1 USDT = 0.9995 USDC</span>
                </Flex>
              </Stack>
            </StructuredCard>
          </section>

          {/* Layout Examples */}
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-6'>Layout Examples</h2>

            {/* Two Column Layout */}
            <div className='mb-8'>
              <h3 className='text-lg font-medium mb-4'>Two Column Layout (60/40)</h3>
              <TwoColumnLayout
                main={
                  <Card>
                    <h4 className='font-medium mb-2'>Main Content (60%)</h4>
                    <p className='text-text-secondary'>
                      This is the main content area. Perfect for primary information, forms, or
                      detailed content.
                    </p>
                  </Card>
                }
                sidebar={
                  <Card>
                    <h4 className='font-medium mb-2'>Sidebar (40%)</h4>
                    <p className='text-text-secondary'>
                      Sidebar content like navigation, filters, or supplementary information.
                    </p>
                  </Card>
                }
              />
            </div>

            {/* Single Column Layout */}
            <div>
              <h3 className='text-lg font-medium mb-4'>Single Column Layout</h3>
              <SingleColumnLayout>
                <Card>
                  <h4 className='font-medium mb-2'>Centered Content</h4>
                  <p className='text-text-secondary'>
                    Single column layout with consistent spacing and centered content. Perfect for
                    focused tasks.
                  </p>
                </Card>
              </SingleColumnLayout>
            </div>
          </section>

          {/* Shadow and Border Examples */}
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-6'>
              Shadow and Border System
            </h2>
            <Grid columns='auto' gap='desktop'>
              <div className='bg-surface-card rounded-xs shadow-subtle p-6'>
                <h4 className='font-medium'>Subtle Shadow + XS Radius</h4>
                <p className='text-text-secondary text-sm mt-1'>4px border radius</p>
              </div>

              <div className='bg-surface-card rounded-sm shadow-card p-6'>
                <h4 className='font-medium'>Card Shadow + SM Radius</h4>
                <p className='text-text-secondary text-sm mt-1'>8px border radius</p>
              </div>

              <div className='bg-surface-card rounded-md shadow-modal p-6'>
                <h4 className='font-medium'>Modal Shadow + MD Radius</h4>
                <p className='text-text-secondary text-sm mt-1'>12px border radius</p>
              </div>

              <div className='bg-surface-card rounded-lg shadow-high p-6'>
                <h4 className='font-medium'>High Shadow + LG Radius</h4>
                <p className='text-text-secondary text-sm mt-1'>16px border radius</p>
              </div>

              <div className='bg-surface-card rounded-xl shadow-brand p-6'>
                <h4 className='font-medium'>Brand Shadow + XL Radius</h4>
                <p className='text-text-secondary text-sm mt-1'>24px border radius</p>
              </div>
            </Grid>
          </section>

          {/* Animation Examples */}
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-6'>Animation System</h2>
            <Grid columns='auto' gap='desktop'>
              <div className='bg-surface-card rounded-lg p-6 animate-fade-in'>
                <h4 className='font-medium'>Fade In Animation</h4>
                <p className='text-text-secondary text-sm mt-1'>300ms ease-out</p>
              </div>

              <div className='bg-surface-card rounded-lg p-6 animate-slide-up'>
                <h4 className='font-medium'>Slide Up Animation</h4>
                <p className='text-text-secondary text-sm mt-1'>300ms ease-out</p>
              </div>

              <div className='bg-surface-card rounded-lg p-6 animate-scale-in'>
                <h4 className='font-medium'>Scale In Animation</h4>
                <p className='text-text-secondary text-sm mt-1'>250ms ease-out</p>
              </div>

              <div className='bg-brand-primary text-white rounded-lg p-6 animate-pulse-brand'>
                <h4 className='font-medium'>Brand Pulse Animation</h4>
                <p className='text-white opacity-90 text-sm mt-1'>2s infinite</p>
              </div>
            </Grid>
          </section>
        </Stack>
      </Container>

      <Spacer size='16' />
    </div>
  );
};
