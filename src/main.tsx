import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { initLenis } from './lib/lenis'

const Diagnostico = lazy(() => import('./pages/Diagnostico'))

function NotFound() {
  return (
    <div style={{ background: '#08070B', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#F5EFE0' }}>
      <span style={{ fontSize: '5rem', lineHeight: 1, color: '#C9A86A' }}>404</span>
      <p style={{ marginTop: '1rem', color: '#C7BFB1' }}>Página no encontrada</p>
      <a href="/" style={{ marginTop: '2rem', color: '#C9A86A', textDecoration: 'none', fontSize: '0.9rem' }}>← Volver al inicio</a>
    </div>
  )
}

// Start smooth scroll immediately — before React mounts
initLenis()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<App page="blog" />} />
        <Route path="/blog/:slug" element={<App page="blogPost" />} />
        <Route
          path="/diagnostico"
          element={
            <Suspense fallback={null}>
              <Diagnostico />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
