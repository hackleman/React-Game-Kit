import { useRef } from 'react';
import { useGameLoop } from '../game';
import StartScreen from './components/StartScreen';
import PauseScreen from './components/PauseScreen';
import { useGameState } from '../game/entities/interfaces/GameState';
import './App.css'

function App() {
  const canvasRef = useRef(null);
  useGameLoop(canvasRef.current);

  const { score, initialized, isRunning, isPaused, startGame, resumeGame } = useGameState();

  return (
    <>
      {!isRunning && (
        <StartScreen 
          onStartGame={() => startGame()} 
          score={score}
          initialized={initialized}
        />
      )}
      {
        isPaused && (
          <PauseScreen 
            resumeGame={() => resumeGame()}
            score={score}
          />
        )
      }
      <div id="score-board">
        <span>Score: <span id="scoreEl">{ score }</span></span>
      </div>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default App
