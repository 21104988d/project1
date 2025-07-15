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
        <div className='input-label'>You send</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <input
            type='number'
            placeholder='0.0'
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            className='amount-input'
            style={{ width: '60%' }}
          />
          <select
            value={fromToken}
            onChange={e => setFromToken(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: 'white',
            }}
          >
            <option value='USDT'>USDT</option>
            <option value='USDC'>USDC</option>
            <option value='ETH'>ETH</option>
          </select>
        </div>
        <select
          value={fromChain}
          onChange={e => setFromChain(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '0.5rem',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <option value='Ethereum'>Ethereum</option>
          <option value='Arbitrum'>Arbitrum</option>
          <option value='Polygon'>Polygon</option>
          <option value='BSC'>Binance Smart Chain</option>
        </select>
      </div>

      {/* Swap Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
        <button
          onClick={swapDirection}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          ↕️
        </button>
      </div>

      {/* To Section */}
      <div className='token-input'>
        <div className='input-label'>You receive</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <input
            type='number'
            placeholder='0.0'
            value={toAmount}
            onChange={e => setToAmount(e.target.value)}
            className='amount-input'
            style={{ width: '60%' }}
          />
          <select
            value={toToken}
            onChange={e => setToToken(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: 'white',
            }}
          >
            <option value='USDT'>USDT</option>
            <option value='USDC'>USDC</option>
            <option value='ETH'>ETH</option>
          </select>
        </div>
        <select
          value={toChain}
          onChange={e => setToChain(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '0.5rem',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <option value='Ethereum'>Ethereum</option>
          <option value='Arbitrum'>Arbitrum</option>
          <option value='Polygon'>Polygon</option>
          <option value='BSC'>Binance Smart Chain</option>
        </select>
      </div>

      {/* Swap Action Button */}
      <button
        onClick={handleSwap}
        className='primary-button'
        disabled={!fromAmount || parseFloat(fromAmount) <= 0}
      >
        {fromAmount && parseFloat(fromAmount) > 0 ? 'Swap' : 'Enter an amount'}
      </button>
    </div>
  );
};
