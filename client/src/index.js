import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // points to App.js
import './App.newoneuse.css'; // ✅ your correct CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
