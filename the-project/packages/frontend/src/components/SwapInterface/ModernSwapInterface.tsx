import React, { useState } from 'react';

interface SwapInterfaceProps {
  onSwap?: () => void;
}

export const SwapInterface: React.FC<SwapInterfaceProps> = ({ onSwap }) => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('USDT');
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('Arbitrum');
  // @ts-expect-error setSenderWallet will be used when wallet connection is implemented
  const [senderWallet, setSenderWallet] = useState('');
  const [receiverWallet, setReceiverWallet] = useState('');

  const handleSwap = () => {
    if (onSwap) {
      onSwap();
    }
  };

  const swapDirection = () => {
    const tempToken = fromToken;
    const tempChain = fromChain;
    const tempAmount = fromAmount;

    setFromToken(toToken);
    setFromChain(toChain);
    setFromAmount(toAmount);

    setToToken(tempToken);
    setToChain(tempChain);
    setToAmount(tempAmount);
  };

  return (
    <div className='swap-interface'>
      {/* From Section */}
      <div className='token-input'>
        <div className='input-label mb-3 text-purple-300 font-medium'>You send</div>
        <div className='bg-surface-card rounded-lg p-4 border border-border-DEFAULT mb-4'>
          <div className='flex justify-between items-center mb-3'>
            <input
              type='number'
              placeholder='0.0'
              value={fromAmount}
              onChange={e => setFromAmount(e.target.value)}
              className='text-h2 font-semibold bg-transparent border-none outline-none flex-1 text-text-primary placeholder-text-tertiary'
            />
            <button className='ml-3 px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg text-sm font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105'>
              <span className='font-medium'>{fromToken}</span>
              <svg
                className='w-4 h-4 ml-1 inline'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-500'>~$0.00 USD</div>
            <div className='text-sm text-gray-500'>Balance: 0.00</div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='block mb-2 text-sm text-purple-300 font-medium'>Network</div>
          <button className='w-full justify-between flex items-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl'>
            <span className='font-medium'>{fromChain}</span>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className='flex justify-center my-6'>
        <button
          onClick={swapDirection}
          className='rounded-full w-14 h-14 p-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-2 border-white hover:shadow-2xl text-white transform transition-all duration-300 hover:scale-110 hover:rotate-180'
        >
          <svg
            className='w-6 h-6 text-white mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
            />
          </svg>
        </button>
      </div>

      {/* Wallet Addresses Section */}
      <div className='wallet-addresses-section mb-6'>
        <div className='wallet-address-container mb-4'>
          <div className='input-label mb-3 text-purple-300 font-medium'>Sender Wallet</div>
          <div className='bg-surface-card rounded-lg p-4 border border-border-DEFAULT'>
            <div className='flex justify-between items-center'>
              <input
                type='text'
                placeholder='Connect wallet to see your address'
                value={senderWallet}
                className='text-sm font-medium bg-transparent border-none outline-none flex-1 text-text-primary placeholder-text-tertiary'
                readOnly
              />
              {senderWallet && (
                <div className='text-xs text-gray-500 bg-purple-100 px-3 py-1 rounded-full'>
                  ✓ Connected
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='wallet-address-container'>
          <div className='input-label mb-3 text-purple-300 font-medium'>Receiver Wallet</div>
          <div className='bg-surface-card rounded-lg p-4 border border-border-DEFAULT'>
            <input
              type='text'
              placeholder='Enter destination wallet address (0x...)'
              value={receiverWallet}
              onChange={e => setReceiverWallet(e.target.value)}
              className='text-sm font-medium bg-transparent border-none outline-none w-full text-text-primary placeholder-text-tertiary'
            />
          </div>
          <div className='text-xs text-gray-500 mt-2 px-1'>
            Make sure the address supports the selected network
          </div>
        </div>
      </div>

      {/* To Section */}
      <div className='token-input'>
        <div className='input-label mb-3 text-purple-300 font-medium'>You receive</div>
        <div className='bg-surface-card rounded-lg p-4 border border-border-DEFAULT mb-4'>
          <div className='flex justify-between items-center mb-3'>
            <input
              type='number'
              placeholder='0.0'
              value={toAmount}
              onChange={e => setToAmount(e.target.value)}
              className='text-h2 font-semibold bg-transparent border-none outline-none flex-1 text-text-primary placeholder-text-tertiary'
            />
            <button className='ml-3 px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg text-sm font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105'>
              <span className='font-medium'>{toToken}</span>
              <svg
                className='w-4 h-4 ml-1 inline'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-500'>~$0.00 USD</div>
            <div className='text-sm text-gray-500'>Balance: 0.00</div>
          </div>
        </div>

        <div className='mb-6'>
          <div className='block mb-2 text-sm text-purple-300 font-medium'>Network</div>
          <button className='w-full justify-between flex items-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl'>
            <span className='font-medium'>{toChain}</span>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Action Button */}
      <button
        onClick={handleSwap}
        disabled={!fromAmount || parseFloat(fromAmount) <= 0}
        className='w-full py-4 px-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 transform'
      >
        {fromAmount && parseFloat(fromAmount) > 0 ? 'Swap Tokens' : 'Enter an amount'}
      </button>
    </div>
  );
};
