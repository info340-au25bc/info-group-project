import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// imported our css styling from draft 1
import './index.css';

// imported BrowserRouter
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  // added BrowserRouter so we can use keep track of the current url
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
