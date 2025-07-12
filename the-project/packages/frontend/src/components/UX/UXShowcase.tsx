// UX Showcase Component
// Demonstrates all the user experience optimization features

import React, { useState } from 'react';
import {
  ZeroCognitiveLoadContainer,
  ZCLButton,
  ZCLStatus,
  ZCLProgressiveDisclosure,
  TransactionTransparency,
  PriceTransparency,
  SecurityTransparency,
  FastQuote,
  MobileSwapInterface,
  TouchButton,
} from '../UX';

export const UXShowcase: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  // Mock data for demonstrations
  const mockTransactionSteps = [
    {
      id: '1',
      title: 'Approve USDT spending',
      status: 'completed' as const,
      estimatedTime: '30',
      actualTime: '25',
      details: 'Smart contract approval for USDT transfer',
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
    },
    {
      id: '2',
      title: 'Cross-chain bridge transfer',
      status: 'processing' as const,
      estimatedTime: '180',
      details: 'Moving USDT from Ethereum to Arbitrum',
    },
    {
      id: '3',
      title: 'Receive USDT on destination',
      status: 'waiting' as const,
      estimatedTime: '60',
      details: 'Final confirmation on Arbitrum network',
    },
  ];

  const mockQuote = {
    inputAmount: '1000',
    outputAmount: '998.50',
    inputToken: 'USDT',
    outputToken: 'USDC',
    exchangeRate: '0.9985',
    priceImpact: '0.15',
    route: [
      { protocol: 'Uniswap V3', percentage: '70', fee: '0.05' },
      { protocol: 'Curve', percentage: '30', fee: '0.04' },
    ],
  };

  const mockMarketData = {
    marketPrice: '0.9987',
    spread: '0.02',
    liquidity: '$2.4M',
  };

  const mockTokens = [
    { symbol: 'USDT', name: 'Tether USD', icon: '💰' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'DAI', name: 'Dai Stablecoin', icon: '💶' },
  ];

  const handleMockSwap = async (fromToken: string, toToken: string, amount: string) => {
    console.log('Mock swap:', { fromToken, toToken, amount });
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleQuoteUpdate = (quote: any) => {
    console.log('Quote updated:', quote);
  };

  return (
    <ZeroCognitiveLoadContainer
      title='UX Component Showcase'
      subtitle='Experience the optimized user interface'
    >
      <div className='space-y-8'>
        {/* Zero Cognitive Load Demo */}
        <section>
          <h3 className='text-lg font-semibold mb-4'>Zero Cognitive Load Interface</h3>
          <div className='space-y-4'>
            <div className='flex gap-2 flex-wrap'>
              <ZCLButton onClick={() => setShowDemo(!showDemo)}>
                {showDemo ? 'Hide Demo' : 'Show Demo'}
              </ZCLButton>
              <ZCLButton variant='secondary' onClick={() => {}}>
                Secondary Action
              </ZCLButton>
              <ZCLButton variant='danger' onClick={() => {}}>
                Danger Action
              </ZCLButton>
            </div>

            <ZCLStatus
              status='success'
              message='Connection established'
              details='Successfully connected to Ethereum mainnet'
            />

            <ZCLProgressiveDisclosure triggerText='Advanced Options'>
              <div className='space-y-2'>
                <p>✅ Slippage tolerance: 0.5%</p>
                <p>✅ Gas optimization: Enabled</p>
                <p>✅ MEV protection: Active</p>
              </div>
            </ZCLProgressiveDisclosure>
          </div>
        </section>

        {showDemo && (
          <>
            {/* Radical Transparency Demo */}
            <section>
              <h3 className='text-lg font-semibold mb-4'>Radical Transparency</h3>
              <div className='grid md:grid-cols-2 gap-6'>
                <TransactionTransparency
                  transactionId='0xabcdef1234567890abcdef1234567890abcdef12'
                  status='pending'
                  steps={mockTransactionSteps}
                  fees={{
                    networkFee: '0.025',
                    protocolFee: '0.015',
                    totalFee: '0.040',
                    currency: 'ETH',
                  }}
                  onCancel={() => console.log('Transaction cancelled')}
                />

                <div className='space-y-4'>
                  <PriceTransparency quote={mockQuote} marketData={mockMarketData} />

                  <SecurityTransparency
                    contractAddress='0x1234567890abcdef1234567890abcdef12345678'
                    auditStatus='audited'
                    riskLevel='low'
                    securityFeatures={[
                      'Multi-signature wallet',
                      'Time-locked upgrades',
                      'Emergency pause mechanism',
                      'Formal verification',
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* Speed Optimization Demo */}
            <section>
              <h3 className='text-lg font-semibold mb-4'>Speed as a Feature</h3>
              <FastQuote
                fromToken='USDT'
                toToken='USDC'
                amount='1000'
                onQuoteUpdate={handleQuoteUpdate}
              />
            </section>

            {/* Mobile PWA Demo */}
            <section>
              <h3 className='text-lg font-semibold mb-4'>Mobile-Optimized Experience</h3>
              <div className='max-w-sm mx-auto'>
                <MobileSwapInterface onSwap={handleMockSwap} tokens={mockTokens} />
              </div>

              <div className='mt-6 flex gap-4 justify-center flex-wrap'>
                <TouchButton
                  onClick={() => console.log('Touch interaction!')}
                  hapticFeedback={true}
                >
                  Touch-Optimized Button
                </TouchButton>
                <TouchButton
                  variant='secondary'
                  size='large'
                  onClick={() => console.log('Large touch button!')}
                >
                  Large Touch Button
                </TouchButton>
              </div>
            </section>

            {/* Feature Summary */}
            <section>
              <h3 className='text-lg font-semibold mb-4'>UX Features Summary</h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='p-4 bg-blue-50 rounded-lg'>
                  <h4 className='font-semibold text-blue-900'>Zero Cognitive Load</h4>
                  <p className='text-sm text-blue-700 mt-2'>
                    Minimal mental effort required. Clear actions, simple choices.
                  </p>
                </div>

                <div className='p-4 bg-green-50 rounded-lg'>
                  <h4 className='font-semibold text-green-900'>"It Just Works"</h4>
                  <p className='text-sm text-green-700 mt-2'>
                    Self-healing, graceful degradation, auto-recovery.
                  </p>
                </div>

                <div className='p-4 bg-purple-50 rounded-lg'>
                  <h4 className='font-semibold text-purple-900'>Radical Transparency</h4>
                  <p className='text-sm text-purple-700 mt-2'>
                    Complete visibility into fees, risks, and progress.
                  </p>
                </div>

                <div className='p-4 bg-orange-50 rounded-lg'>
                  <h4 className='font-semibold text-orange-900'>Speed & Mobile</h4>
                  <p className='text-sm text-orange-700 mt-2'>
                    Fast responses, touch-friendly, PWA-ready.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </ZeroCognitiveLoadContainer>
  );
};
