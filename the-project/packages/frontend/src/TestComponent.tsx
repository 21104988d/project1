import React from 'react';

const TestComponent: React.FC = () => {
  console.log('TestComponent is rendering...');

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f0f0f0',
        color: '#333',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
        🚀 Codespaces Test - DApp is Working!
      </h1>

      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ color: '#059669', marginBottom: '15px' }}>✅ Frontend Successfully Loaded</h2>
        <p>If you can see this message, the React app is working correctly in GitHub Codespaces!</p>

        <div style={{ marginTop: '15px' }}>
          <p>
            <strong>Environment:</strong> GitHub Codespaces
          </p>
          <p>
            <strong>Port:</strong> 5173
          </p>
          <p>
            <strong>Status:</strong> <span style={{ color: '#059669' }}>Connected ✓</span>
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#dbeafe',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #3b82f6',
        }}
      >
        <h3 style={{ color: '#1d4ed8', marginBottom: '10px' }}>Next Steps:</h3>
        <p>Once this test works, we'll restore the full DApp interface.</p>
      </div>
    </div>
  );
};

export default TestComponent;
