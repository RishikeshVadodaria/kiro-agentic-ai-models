import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('main.tsx loaded')
console.log('Root element:', document.getElementById('root'))

try {
  const root = createRoot(document.getElementById('root')!)
  console.log('Root created successfully')
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log('App rendered successfully')
} catch (error) {
  console.error('Error rendering app:', error)
}
