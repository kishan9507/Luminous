import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { EnergyProvider } from './context/EnergyContext';

// Import any global styles if needed
import './index.css'; // Example for global CSS

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <EnergyProvider>
        <App />
      </EnergyProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);