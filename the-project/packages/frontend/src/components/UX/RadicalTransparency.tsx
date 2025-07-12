// Radical Transparency Components
// Focus: Clear communication, honest feedback, and simple presentation

import React, { useState, useEffect } from 'react';

// Transaction transparency component
interface TransactionTransparencyProps {
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'failed';
  steps: Array<{
    id: string;
    title: string;
    status: 'waiting' | 'processing' | 'completed' | 'failed';
    estimatedTime?: string;
    actualTime?: string;
    details?: string;
    txHash?: string;
  }>;
  fees: {
    networkFee: string;
    protocolFee: string;
    totalFee: string;
    currency: string;
  };
  onCancel?: () => void;
}

export const TransactionTransparency: React.FC<TransactionTransparencyProps> = ({
  transactionId,
  status,
  steps,
  fees,
  onCancel,
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getStatusIcon = (stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return '✅';
      case 'processing':
        return '🔄';
      case 'failed':
        return '❌';
      case 'waiting':
        return '⏳';
      default:
        return '⏳';
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    const seconds = parseInt(timeString);
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <div className='rt-transparency-panel'>
      {/* Header */}
      <div className='rt-header'>
        <h3 className='rt-title'>Transaction Progress</h3>
        {transactionId && (
          <p className='rt-tx-id'>
            ID: {transactionId.slice(0, 8)}...{transactionId.slice(-8)}
          </p>
        )}
      </div>

      {/* Overall Status */}
      <div className={`rt-status rt-status--${status}`}>
        <span className='rt-status__icon'>
          {status === 'pending' && '🔄'}
          {status === 'confirmed' && '✅'}
          {status === 'failed' && '❌'}
        </span>
        <span className='rt-status__text'>
          {status === 'pending' && 'Transaction in Progress'}
          {status === 'confirmed' && 'Transaction Completed'}
          {status === 'failed' && 'Transaction Failed'}
        </span>
      </div>

      {/* Fee Breakdown */}
      <div className='rt-fees'>
        <h4 className='rt-fees__title'>Fee Breakdown</h4>
        <div className='rt-fees__list'>
          <div className='rt-fee-item'>
            <span>Network Fee:</span>
            <span>
              {fees.networkFee} {fees.currency}
            </span>
          </div>
          <div className='rt-fee-item'>
            <span>Protocol Fee:</span>
            <span>
              {fees.protocolFee} {fees.currency}
            </span>
          </div>
          <div className='rt-fee-item rt-fee-item--total'>
            <span>Total Fees:</span>
            <span>
              {fees.totalFee} {fees.currency}
            </span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Progress */}
      <div className='rt-steps'>
        <h4 className='rt-steps__title'>Progress Steps</h4>
        {steps.map(step => (
          <div key={step.id} className={`rt-step rt-step--${step.status}`}>
            <div className='rt-step__header'>
              <span className='rt-step__icon'>{getStatusIcon(step.status)}</span>
              <span className='rt-step__title'>{step.title}</span>
              <div className='rt-step__timing'>
                {step.estimatedTime && step.status === 'waiting' && (
                  <span className='rt-step__estimated'>~{formatTime(step.estimatedTime)}</span>
                )}
                {step.actualTime && step.status === 'completed' && (
                  <span className='rt-step__actual'>{formatTime(step.actualTime)}</span>
                )}
              </div>
              {(step.details || step.txHash) && (
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className='rt-step__expand'
                >
                  {expandedStep === step.id ? '▲' : '▼'}
                </button>
              )}
            </div>

            {expandedStep === step.id && (
              <div className='rt-step__details'>
                {step.details && <p>{step.details}</p>}
                {step.txHash && (
                  <p>
                    Transaction Hash:
                    <a
                      href={`https://etherscan.io/tx/${step.txHash}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rt-link'
                    >
                      {step.txHash.slice(0, 8)}...{step.txHash.slice(-8)}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      {status === 'pending' && onCancel && (
        <div className='rt-actions'>
          <button onClick={onCancel} className='rt-button rt-button--cancel'>
            Cancel Transaction
          </button>
        </div>
      )}
    </div>
  );
};

// Price transparency component
interface PriceTransparencyProps {
  quote: {
    inputAmount: string;
    outputAmount: string;
    inputToken: string;
    outputToken: string;
    exchangeRate: string;
    priceImpact: string;
    route: Array<{
      protocol: string;
      percentage: string;
      fee: string;
    }>;
  };
  marketData: {
    marketPrice: string;
    spread: string;
    liquidity: string;
  };
}

export const PriceTransparency: React.FC<PriceTransparencyProps> = ({ quote, marketData }) => {
  return (
    <div className='rt-price-panel'>
      <h4 className='rt-price__title'>Price Breakdown</h4>

      {/* Main Quote */}
      <div className='rt-quote'>
        <div className='rt-quote__main'>
          <span className='rt-quote__rate'>
            1 {quote.inputToken} = {quote.exchangeRate} {quote.outputToken}
          </span>
        </div>
        <div className='rt-quote__impact'>
          <span
            className={`rt-impact ${parseFloat(quote.priceImpact) > 3 ? 'rt-impact--high' : 'rt-impact--low'}`}
          >
            Price Impact: {quote.priceImpact}%
          </span>
        </div>
      </div>

      {/* Market Comparison */}
      <div className='rt-market'>
        <div className='rt-market__item'>
          <span>Market Price:</span>
          <span>{marketData.marketPrice}</span>
        </div>
        <div className='rt-market__item'>
          <span>Spread:</span>
          <span>{marketData.spread}%</span>
        </div>
        <div className='rt-market__item'>
          <span>Available Liquidity:</span>
          <span>{marketData.liquidity}</span>
        </div>
      </div>

      {/* Route Breakdown */}
      <div className='rt-route'>
        <h5 className='rt-route__title'>Route Details</h5>
        {quote.route.map((route, index) => (
          <div key={index} className='rt-route__item'>
            <span className='rt-route__protocol'>{route.protocol}</span>
            <span className='rt-route__percentage'>{route.percentage}%</span>
            <span className='rt-route__fee'>{route.fee}% fee</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Security transparency component
interface SecurityTransparencyProps {
  contractAddress: string;
  auditStatus: 'audited' | 'unaudited' | 'in-progress';
  riskLevel: 'low' | 'medium' | 'high';
  securityFeatures: string[];
  warnings?: string[];
}

export const SecurityTransparency: React.FC<SecurityTransparencyProps> = ({
  contractAddress,
  auditStatus,
  riskLevel,
  securityFeatures,
  warnings = [],
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'green';
      case 'medium':
        return 'orange';
      case 'high':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getAuditIcon = (status: string) => {
    switch (status) {
      case 'audited':
        return '🛡️';
      case 'in-progress':
        return '🔍';
      case 'unaudited':
        return '⚠️';
      default:
        return '❓';
    }
  };

  return (
    <div className='rt-security-panel'>
      <h4 className='rt-security__title'>Security Information</h4>

      {/* Contract Info */}
      <div className='rt-contract'>
        <p className='rt-contract__address'>
          Contract:
          <a
            href={`https://etherscan.io/address/${contractAddress}`}
            target='_blank'
            rel='noopener noreferrer'
            className='rt-link'
          >
            {contractAddress.slice(0, 8)}...{contractAddress.slice(-8)}
          </a>
        </p>
      </div>

      {/* Risk Assessment */}
      <div className='rt-risk'>
        <div className={`rt-risk__level rt-risk--${riskLevel}`}>
          <span className='rt-risk__indicator' style={{ color: getRiskColor(riskLevel) }}>
            ●
          </span>
          <span className='rt-risk__text'>Risk Level: {riskLevel.toUpperCase()}</span>
        </div>

        <div className='rt-audit'>
          <span className='rt-audit__icon'>{getAuditIcon(auditStatus)}</span>
          <span className='rt-audit__status'>
            {auditStatus === 'audited' && 'Smart contracts audited'}
            {auditStatus === 'in-progress' && 'Audit in progress'}
            {auditStatus === 'unaudited' && 'Not yet audited'}
          </span>
        </div>
      </div>

      {/* Security Features */}
      <div className='rt-features'>
        <h5 className='rt-features__title'>Security Features</h5>
        <ul className='rt-features__list'>
          {securityFeatures.map((feature, index) => (
            <li key={index} className='rt-features__item'>
              ✅ {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className='rt-warnings'>
          <h5 className='rt-warnings__title'>⚠️ Important Notices</h5>
          <ul className='rt-warnings__list'>
            {warnings.map((warning, index) => (
              <li key={index} className='rt-warnings__item'>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Simple status indicator for system health
export const SystemHealthIndicator: React.FC = () => {
  const [healthData, setHealthData] = useState({
    api: 'healthy',
    blockchain: 'healthy',
    pricing: 'healthy',
    lastUpdated: new Date(),
  });

  useEffect(() => {
    // Mock health check - replace with actual health monitoring
    const checkHealth = async () => {
      try {
        // This would be actual health checks
        const response = await fetch('/api/health');
        const data = await response.json();
        setHealthData({
          ...data,
          lastUpdated: new Date(),
        });
      } catch {
        setHealthData(prev => ({
          ...prev,
          api: 'error',
          lastUpdated: new Date(),
        }));
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '🟢';
      case 'degraded':
        return '🟡';
      case 'error':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className='rt-health-indicator'>
      <div className='rt-health__item'>
        <span className='rt-health__icon'>{getStatusIcon(healthData.api)}</span>
        <span className='rt-health__label'>API</span>
      </div>
      <div className='rt-health__item'>
        <span className='rt-health__icon'>{getStatusIcon(healthData.blockchain)}</span>
        <span className='rt-health__label'>Blockchain</span>
      </div>
      <div className='rt-health__item'>
        <span className='rt-health__icon'>{getStatusIcon(healthData.pricing)}</span>
        <span className='rt-health__label'>Pricing</span>
      </div>
      <div className='rt-health__timestamp'>
        Last updated: {healthData.lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
};
