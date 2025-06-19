import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript, theme } from '@chakra-ui/react';
import { AuthProvider } from './contexts/TestAuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Simple test component
function TestHome() {
  console.log('TestHome component rendering');
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Step 3 Test - AuthProvider Added</h1>
      <p>If you can see this, React + Router + ThemeProvider + AuthProvider are working!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}

function TestAppStep3() {
  console.log('TestAppStep3 component rendering');
  
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ThemeProvider>
            <Router>
              <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
                <Routes>
                  <Route path="/" element={<TestHome />} />
                  <Route path="*" element={<TestHome />} />
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default TestAppStep3;
