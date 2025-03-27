import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './ui/App'
import './ui/index.css'
import { GameStateProvider } from './game/context'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </StrictMode>,
)
