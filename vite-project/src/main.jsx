import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Genel stilleri import et
import App from './App'; // Ana bileşen

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);