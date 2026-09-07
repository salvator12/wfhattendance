import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Bungkus App di sini */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
