import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'The Project Documentation',
  description: 'Cross-Chain DApp Router - Stablecoin-First Strategy',
  base: '/docs/',
  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Contracts', link: '/contracts/' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Deployment', link: '/deployment/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
          ],
        },
        {
          text: 'Stablecoin Strategy',
          items: [
            { text: 'Overview', link: '/guide/stablecoin-strategy' },
            { text: 'USDT Core', link: '/guide/usdt-core' },
            { text: 'USDC Integration', link: '/guide/usdc-integration' },
            { text: 'Arbitrage Opportunities', link: '/guide/arbitrage' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Project Structure', link: '/guide/project-structure' },
            { text: 'Development Workflow', link: '/guide/development' },
            { text: 'Testing', link: '/guide/testing' },
            { text: 'Debugging', link: '/guide/debugging' },
          ],
        },
      ],

      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Rate Limiting', link: '/api/rate-limiting' },
          ],
        },
        {
          text: 'Endpoints',
          items: [
            { text: 'Quotes', link: '/api/quotes' },
            { text: 'Routes', link: '/api/routes' },
            { text: 'Execute', link: '/api/execute' },
            { text: 'Status', link: '/api/status' },
            { text: 'Tokens', link: '/api/tokens' },
            { text: 'Chains', link: '/api/chains' },
          ],
        },
        {
          text: 'WebSocket',
          items: [
            { text: 'Real-time Updates', link: '/api/websocket' },
            { text: 'Price Feeds', link: '/api/price-feeds' },
          ],
        },
      ],

      '/contracts/': [
        {
          text: 'Smart Contracts',
          items: [
            { text: 'Overview', link: '/contracts/' },
            { text: 'Architecture', link: '/contracts/architecture' },
            { text: 'Security', link: '/contracts/security' },
          ],
        },
        {
          text: 'Core Contracts',
          items: [
            { text: 'EntrypointContract', link: '/contracts/entrypoint' },
            { text: 'ResolverContract', link: '/contracts/resolver' },
            { text: 'RouterProtocol', link: '/contracts/router' },
          ],
        },
        {
          text: 'Integrations',
          items: [
            { text: 'DEX Adapters', link: '/contracts/dex-adapters' },
            { text: 'Bridge Adapters', link: '/contracts/bridge-adapters' },
            { text: 'Oracle Integration', link: '/contracts/oracles' },
          ],
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Testnet', link: '/contracts/testnet-deployment' },
            { text: 'Mainnet', link: '/contracts/mainnet-deployment' },
            { text: 'Verification', link: '/contracts/verification' },
          ],
        },
      ],

      '/architecture/': [
        {
          text: 'System Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'High-Level Design', link: '/architecture/high-level' },
            { text: 'Component Interaction', link: '/architecture/components' },
          ],
        },
        {
          text: 'Technical Details',
          items: [
            { text: 'Frontend Architecture', link: '/architecture/frontend' },
            { text: 'Backend Services', link: '/architecture/backend' },
            { text: 'Smart Contract Layer', link: '/architecture/contracts' },
            { text: 'Data Flow', link: '/architecture/data-flow' },
          ],
        },
        {
          text: 'Infrastructure',
          items: [
            { text: 'Database Design', link: '/architecture/database' },
            { text: 'Caching Strategy', link: '/architecture/caching' },
            { text: 'Monitoring', link: '/architecture/monitoring' },
          ],
        },
      ],

      '/deployment/': [
        {
          text: 'Deployment Guide',
          items: [
            { text: 'Overview', link: '/deployment/' },
            { text: 'Prerequisites', link: '/deployment/prerequisites' },
            { text: 'Environment Setup', link: '/deployment/environment' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Local Development', link: '/deployment/local' },
            { text: 'Docker Setup', link: '/deployment/docker' },
            { text: 'Database Setup', link: '/deployment/database' },
          ],
        },
        {
          text: 'Production',
          items: [
            { text: 'Infrastructure', link: '/deployment/infrastructure' },
            { text: 'CI/CD Pipeline', link: '/deployment/cicd' },
            { text: 'Monitoring Setup', link: '/deployment/monitoring' },
            { text: 'Security Setup', link: '/deployment/security' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/theproject/the-project' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 The Project Team',
    },

    search: {
      provider: 'local',
    },
  },
});
