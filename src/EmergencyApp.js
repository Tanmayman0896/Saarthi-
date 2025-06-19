import React from 'react';

function EmergencyApp() {
  console.log('🚨 EMERGENCY APP LOADING');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ color: 'red' }}>🚨 EMERGENCY MODE - REACT IS WORKING!</h1>
      <p style={{ fontSize: '18px', color: '#333' }}>
        If you can see this, React is loading successfully.
      </p>
      <p style={{ color: '#666' }}>
        Current URL: {window.location.href}
      </p>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h2>Quick Tests:</h2>
        <button 
          onClick={() => alert('Button works!')}
          style={{ padding: '10px', margin: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          Test Alert
        </button>
        <button 
          onClick={() => window.location.href = '/home'}
          style={{ padding: '10px', margin: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          Try Home Page
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'lightyellow', borderRadius: '5px' }}>
        <h3>Next Steps:</h3>
        <ol>
          <li>If you see this page, React is working fine</li>
          <li>The issue is with your main App component or contexts</li>
          <li>Check browser console (F12) for any red errors</li>
          <li>We'll need to debug the App.js step by step</li>
        </ol>
      </div>
    </div>
  );
}

export default EmergencyApp;
