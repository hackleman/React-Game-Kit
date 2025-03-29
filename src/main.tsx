import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameStateProvider } from './game/state/context'
import App from './ui/App'
import './ui/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </StrictMode>,
)
