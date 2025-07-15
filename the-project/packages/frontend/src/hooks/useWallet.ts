/**
 * @fileoverview Wallet connection and management hook for cross-chain operations
 * @version 1.0.0
 * @author The Project Team
 */

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Interface defining the state of an Ethereum-compatible wallet connection
 */
export interface WalletState {
  /** Whether the wallet is currently connected */
  isConnected: boolean;
  /** The connected wallet address */
  address: string | null;
  /** The current chain ID */
  chainId: number | null;
  /** The wallet provider instance */
  provider: any;
  /** Whether a connection attempt is in progress */
  isConnecting: boolean;
  /** Any error that occurred during wallet operations */
  error: string | null;
}

/**
 * Interface defining the state of a Solana wallet connection
 */
export interface SolanaWalletState {
  /** Whether the Solana wallet is connected */
  isConnected: boolean;
  /** The connected Solana public key */
  publicKey: PublicKey | null;
  /** The Solana connection instance */
  connection: Connection | null;
}

/**
 * Custom hook for managing wallet connections across multiple chains
 * Supports Ethereum-compatible chains and Solana
 * @returns Object containing wallet state and connection methods
 */

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
    isConnecting: false,
    error: null,
  });

  const [solanaWallet, setSolanaWallet] = useState<SolanaWalletState>({
    isConnected: false,
    publicKey: null,
    connection: null,
  });

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setWalletState(prev => ({ ...prev, error: 'MetaMask not installed' }));
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      setWalletState({
        isConnected: true,
        address: accounts[0],
        chainId: Number(network.chainId),
        provider,
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    }
  };

  const connectPhantom = async () => {
    try {
      const { solana } = window as any;

      if (!solana?.isPhantom) {
        setSolanaWallet(prev => ({ ...prev, connection: null }));
        return;
      }

      const response = await solana.connect();
      const connection = new Connection('https://api.devnet.solana.com');

      setSolanaWallet({
        isConnected: true,
        publicKey: response.publicKey,
        connection,
      });
    } catch (error) {
      console.error('Failed to connect to Phantom:', error);
    }
  };

  const disconnect = () => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      provider: null,
      isConnecting: false,
      error: null,
    });

    setSolanaWallet({
      isConnected: false,
      publicKey: null,
      connection: null,
    });
  };

  useEffect(() => {
    // Check if already connected on component mount
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();

            setWalletState({
              isConnected: true,
              address: accounts[0],
              chainId: Number(network.chainId),
              provider,
              isConnecting: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  return {
    wallet: walletState,
    solanaWallet,
    connectMetaMask,
    connectPhantom,
    disconnect,
  };
};
