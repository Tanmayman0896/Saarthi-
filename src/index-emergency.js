import React from 'react';
import * as ReactDOM from 'react-dom/client';
import EmergencyApp from './EmergencyApp';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <EmergencyApp />
  </React.StrictMode>
);
