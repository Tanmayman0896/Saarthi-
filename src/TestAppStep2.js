import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Simple test component with theme support
const ThemeTestHome = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Step 2: Testing ThemeProvider</h1>
    <p style={{ fontSize: '18px' }}>If you see this, ThemeProvider is working!</p>
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
    <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
      <p><strong>Testing:</strong> Router + ThemeProvider</p>
      <p><strong>Next:</strong> If this works, we'll add AuthProvider</p>
    </div>
  </div>
);

const TestPage = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Test Page (Step 2)</h1>
    <p>Router + ThemeProvider working! ✅</p>
    <button 
      onClick={() => window.location.href = '/'}
      style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Back to Home
    </button>
  </div>
);

function TestAppStep2() {
  console.log('🔧 DEBUG: TestAppStep2 with ThemeProvider rendering...');
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ThemeTestHome />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<ThemeTestHome />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default TestAppStep2;
