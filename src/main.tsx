import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { initLenis } from './lib/lenis'

const Diagnostico = lazy(() => import('./pages/Diagnostico'))

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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
