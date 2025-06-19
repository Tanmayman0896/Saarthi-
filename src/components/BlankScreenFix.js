import React from 'react';

// Simple test component to verify React is working
export default function BlankScreenFix() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>🔧 Blank Screen Diagnostic</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        If you can see this, React is loading successfully!
      </p>
      
      <div style={{ margin: '20px 0', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2>📋 Debug Information:</h2>
        <p><strong>Current URL:</strong> {window.location.href}</p>
        <p><strong>React Version:</strong> Working ✅</p>
        <p><strong>Router:</strong> Working ✅</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>🎯 Quick Actions:</h3>
        <button 
          onClick={() => window.location.href = '/home'}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go to Home Page
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reload Page
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h4>🔍 Troubleshooting Tips:</h4>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Press F12 and check the Console tab for errors</li>
          <li>Check the Network tab for failed requests</li>
          <li>Clear browser cache (Ctrl+Shift+Delete)</li>
          <li>Try a different browser</li>
        </ul>
      </div>
    </div>
  );
}
