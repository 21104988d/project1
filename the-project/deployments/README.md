# Deployments Directory

This directory contains deployment results and configurations for different
networks.

## Structure

- `testnet-deployment-*.json` - Deployment results for testnet deployments
- `mainnet-deployment-*.json` - Deployment results for mainnet deployments
- `latest-testnet-deployment.json` - Latest testnet deployment reference
- `latest-mainnet-deployment.json` - Latest mainnet deployment reference

## Usage

Deployment scripts automatically save results here with timestamps for tracking.
Contract verification scripts read from these files to find deployment
addresses.

## Files

- Each deployment creates a timestamped file with complete deployment
  information
- Latest files are updated for easy reference by other scripts
- Network-specific files contain chain ID, contract addresses, and verification
  status
