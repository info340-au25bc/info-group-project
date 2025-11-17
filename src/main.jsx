import React from 'react'; //import React Component
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// imported our css styling from draft 1
import './index.css'
import App from './App.jsx'

// imported BrowserRouter
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
