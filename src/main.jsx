import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Myform from '../src/components/Myform.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Myform />
  </StrictMode>,
)
