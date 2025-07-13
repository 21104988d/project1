import React from 'react';

export default function TestApp() {
  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#FF006E' }}>🚀 PayMe for Web3</h1>
      <p>USDT Cross-Chain Router - Frontend is working!</p>

      <div
        style={{
          backgroundColor: '#26A69A',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <h2>✅ Status: SUCCESS</h2>
        <p>React app is running correctly in GitHub Codespaces</p>
        <ul>
          <li>✅ Vite build system working</li>
          <li>✅ React components rendering</li>
          <li>✅ CSS styles loading</li>
          <li>✅ TypeScript compilation successful</li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h3>🎨 Design System Ready</h3>
        <p>Inter fonts loaded and Typography system implemented</p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Ready to continue with Phase 1.1.1 - Spacing and Layout System
        </p>
      </div>
    </div>
  );
}
