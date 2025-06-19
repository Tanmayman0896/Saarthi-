import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test component
const SimpleHome = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Step 1: Basic App + Router Test</h1>
    <p style={{ fontSize: '18px' }}>If you see this, App.js and Router are working!</p>
    <p style={{ color: '#666' }}>
      Current URL: {window.location.href}
    </p>
    <div style={{ margin: '20px 0' }}>
      <button 
        onClick={() => window.location.href = '/test'}
        style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Test Route Change
      </button>
    </div>
  </div>
);

const TestPage = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Test Page</h1>
    <p>Router is working! ✅</p>
    <button 
      onClick={() => window.location.href = '/'}
      style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Back to Home
    </button>
  </div>
);

function TestApp() {
  console.log('🔧 DEBUG: TestApp rendering...');
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleHome />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<SimpleHome />} />
      </Routes>
    </Router>
  );
}

export default TestApp;
