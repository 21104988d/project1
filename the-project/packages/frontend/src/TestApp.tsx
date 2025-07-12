import React from 'react';

export default function TestApp() {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '20px',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#007acc' }}>🚀 The Project - Frontend Test</h1>
      <p>If you can see this, the React app is working!</p>
      <div
        style={{
          backgroundColor: '#007acc',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          margin: '20px 0',
        }}
      >
        <h2>✅ Success!</h2>
        <p>Frontend is running correctly in Codespaces</p>
      </div>
      <div
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <h3>Next Steps:</h3>
        <ul>
          <li>The white screen issue is fixed</li>
          <li>Vite is properly configured for Codespaces</li>
          <li>Port forwarding is working</li>
        </ul>
      </div>
    </div>
  );
}
