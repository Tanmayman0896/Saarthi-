import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Step 4 test component
const Step4Home = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Step 4: Theme + Auth + Language Providers Test</h1>
    <p style={{ fontSize: '18px' }}>If you see this, all three context providers are working! ✅</p>
    <div style={{ margin: '20px 0' }}>
      <p><strong>✅ React Router:</strong> Working</p>
      <p><strong>✅ ThemeProvider:</strong> Working</p>
      <p><strong>✅ AuthProvider:</strong> Working</p>
      <p><strong>✅ LanguageProvider:</strong> Working</p>
    </div>
    <p style={{ color: '#666' }}>
      Current URL: {window.location.href}
    </p>
    <div style={{ margin: '20px 0' }}>
      <button 
        onClick={() => window.location.href = '/test'}
        style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Test Route
      </button>
    </div>
  </div>
);

const Step4Test = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎯 Step 4: Test Page</h1>
    <p>All providers + routing working! ✅</p>
    <button 
      onClick={() => window.location.href = '/'}
      style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Back to Home
    </button>
  </div>
);

function TestAppStep4() {
  console.log('🔧 DEBUG: Step 4 - Testing Theme + Auth + Language Providers...');
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Step4Home />} />
              <Route path="/test" element={<Step4Test />} />
              <Route path="*" element={<Step4Home />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default TestAppStep4;
