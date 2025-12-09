import React from 'react'; //import React Component
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// imported our css styling from draft 1
import './index.css'
import App from './App.jsx'

// imported BrowserRouter
import { BrowserRouter } from 'react-router-dom';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPA0bSty8yuUHpJzJCszQONdR4MkX4q-M",
  authDomain: "bookbuddy-project-e5386.firebaseapp.com",
  databaseURL: "https://bookbuddy-project-e5386-default-rtdb.firebaseio.com",
  projectId: "bookbuddy-project-e5386",
  storageBucket: "bookbuddy-project-e5386.firebasestorage.app",
  messagingSenderId: "1000459285562",
  appId: "1:1000459285562:web:5d85e18edf73bcdc19b103"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
