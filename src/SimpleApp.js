import React from 'react';
import './App.css';
import './index.css';

function SimpleApp() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Saarthi App - Simple Test</h1>
      <p>If you can see this, React is working!</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Environment Check:</h2>
        <p>Firebase API Key: {process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</p>
        <p>Admin Email: {process.env.REACT_APP_ADMIN_EMAIL ? '✅ Set' : '❌ Missing'}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => window.location.href = '/diagnostic'}>
          Go to Diagnostic Page
        </button>
      </div>
    </div>
  );
}

export default SimpleApp;
