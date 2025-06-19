import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import "./i18n.js";

console.log('🔧 DEBUG: Starting main Saarthi app...');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <Suspense fallback={<div style={{padding: '20px', textAlign: 'center', fontSize: '18px'}}>Loading Saarthi...</div>}>
        <App />
      </Suspense>
    </ChakraProvider>
  </StrictMode>
);

console.log('🔧 DEBUG: React render initiated...');