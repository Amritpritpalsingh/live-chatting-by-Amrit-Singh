import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chatapp from './chatApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chatapp />
  </StrictMode>,
)
