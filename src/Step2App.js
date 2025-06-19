import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Simple test component
const Step2Home = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Step 2: App + Router + ThemeProvider Test</h1>
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
  </div>
);

const TestPage = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Test Page - Step 2</h1>
    <p>Router + ThemeProvider working! ✅</p>
    <button 
      onClick={() => window.location.href = '/'}
      style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Back to Home
    </button>
  </div>
);

function Step2App() {
  console.log('🔧 DEBUG: Step2App with ThemeProvider rendering...');
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Step2Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<Step2Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default Step2App;
