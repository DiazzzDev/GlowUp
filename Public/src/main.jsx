import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // Importamos el router
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolvemos la App para que funcionen las rutas */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)