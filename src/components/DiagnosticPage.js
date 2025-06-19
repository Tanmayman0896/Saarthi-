import React from 'react';

export default function DiagnosticPage() {
  const envVars = {
    'REACT_APP_FIREBASE_API_KEY': process.env.REACT_APP_FIREBASE_API_KEY,
    'REACT_APP_FIREBASE_AUTH_DOMAIN': process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    'REACT_APP_FIREBASE_PROJECT_ID': process.env.REACT_APP_FIREBASE_PROJECT_ID,
    'REACT_APP_FIREBASE_STORAGE_BUCKET': process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID': process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    'REACT_APP_FIREBASE_APP_ID': process.env.REACT_APP_FIREBASE_APP_ID,
    'REACT_APP_ADMIN_EMAIL': process.env.REACT_APP_ADMIN_EMAIL,
    'REACT_APP_ADMIN_PASSWORD': process.env.REACT_APP_ADMIN_PASSWORD
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Saarthi App Diagnostic Page</h1>
      <p>If you see this page, React is loading correctly.</p>
      
      <h2>Environment Variables Status:</h2>
      <ul>
        {Object.entries(envVars).map(([key, value]) => (
          <li key={key} style={{ marginBottom: '5px' }}>
            <strong>{key}:</strong> {value ? '✅ Set' : '❌ Missing'} 
            {value && key !== 'REACT_APP_ADMIN_PASSWORD' && (
              <span style={{ color: '#666', marginLeft: '10px' }}>
                ({value.substring(0, 10)}...)
              </span>
            )}
          </li>
        ))}
      </ul>

      <h2>React Router Test:</h2>
      <p>Current URL: {window.location.href}</p>
      
      <h2>Firebase Import Test:</h2>
      <div>
        {(() => {
          try {
            require('../firebase');
            return '✅ Firebase imports successfully';
          } catch (error) {
            return `❌ Firebase import error: ${error.message}`;
          }
        })()}
      </div>

      <h2>Console Instructions:</h2>
      <p>1. Open browser developer tools (F12)</p>
      <p>2. Check the Console tab for any error messages</p>
      <p>3. Check the Network tab for failed requests</p>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Quick Actions:</h3>
        <button 
          onClick={() => window.location.href = '/home'} 
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Go to Home
        </button>
        <button 
          onClick={() => window.location.href = '/login'} 
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Go to Login
        </button>
        <button 
          onClick={() => window.location.reload()} 
          style={{ padding: '5px 10px' }}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
