import React from 'react';
import { Typography } from './design-system';

export default function TestApp() {
  return (
    <div className='min-h-screen bg-surface-background p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <Typography variant='display' className='text-brand-primary mb-2'>
            🚀 PayMe for Web3
          </Typography>
          <Typography variant='h2' className='text-semantic-success mb-4'>
            USDT Cross-Chain Router - Design System Test
          </Typography>
          <Typography variant='body' className='text-content-secondary'>
            If you can see this, the React app with our design system is working correctly in GitHub
            Codespaces!
          </Typography>
        </div>

        {/* Status Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-semantic-success p-6 rounded-lg text-white'>
            <Typography variant='h3' className='text-white mb-2'>
              ✅ Frontend Status
            </Typography>
            <Typography variant='body' className='text-white/90'>
              React, TypeScript, and Vite are working correctly
            </Typography>
          </div>

          <div className='bg-brand-primary p-6 rounded-lg text-white'>
            <Typography variant='h3' className='text-white mb-2'>
              🎨 Design System
            </Typography>
            <Typography variant='body' className='text-white/90'>
              Typography system with Inter fonts is loaded
            </Typography>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className='bg-surface-card p-6 rounded-lg mb-8'>
          <Typography variant='h2' className='text-content-primary mb-6'>
            Typography System Demo
          </Typography>

          <div className='space-y-4'>
            <div>
              <Typography variant='h1' className='text-content-primary'>
                Heading 1 - Main Titles
              </Typography>
            </div>
            <div>
              <Typography variant='h2' className='text-content-primary'>
                Heading 2 - Section Titles
              </Typography>
            </div>
            <div>
              <Typography variant='h3' className='text-content-primary'>
                Heading 3 - Subsections
              </Typography>
            </div>
            <div>
              <Typography variant='body' className='text-content-primary'>
                Body text - This is the main text used throughout the application. It's designed to
                be highly readable and accessible.
              </Typography>
            </div>
            <div>
              <Typography variant='small' className='text-content-secondary'>
                Small text - Used for captions, metadata, and secondary information.
              </Typography>
            </div>
          </div>
        </div>

        {/* Color System Demo */}
        <div className='bg-surface-card p-6 rounded-lg'>
          <Typography variant='h2' className='text-content-primary mb-6'>
            Color System Demo
          </Typography>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center'>
              <div className='w-full h-16 bg-brand-primary rounded mb-2'></div>
              <Typography variant='small' className='text-content-secondary'>
                Brand Primary
              </Typography>
            </div>
            <div className='text-center'>
              <div className='w-full h-16 bg-stablecoin-usdt rounded mb-2'></div>
              <Typography variant='small' className='text-content-secondary'>
                USDT Green
              </Typography>
            </div>
            <div className='text-center'>
              <div className='w-full h-16 bg-semantic-success rounded mb-2'></div>
              <Typography variant='small' className='text-content-secondary'>
                Success
              </Typography>
            </div>
            <div className='text-center'>
              <div className='w-full h-16 bg-semantic-warning rounded mb-2'></div>
              <Typography variant='small' className='text-content-secondary'>
                Warning
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
