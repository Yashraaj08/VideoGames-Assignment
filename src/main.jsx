import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Entry point of the React application
 * - `StrictMode` helps identify potential problems
 * - `createRoot` enables React 18 concurrent features
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);