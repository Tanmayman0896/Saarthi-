import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp';
// Temporarily using SimpleApp to test basic React functionality

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SimpleApp />
      </Suspense>
    </ChakraProvider>
  </StrictMode>
);
