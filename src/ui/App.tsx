import { useGameState } from '../game/state/GameState';
import { useConnection } from '../game/hooks/sockets';
import { useGameLoop } from '../game/hooks/game';
import StartScreen from './components/StartScreen';
import styled from '@emotion/styled';

const ScoreBoard = styled.span`
  position: absolute;
  color: white;
  padding: 8px;
  font-family: sans-serif;
  font-size: 14px;
  user-select: none;
`;

function App() {
  const { score, isRunning } = useGameState();

  useGameLoop();
  useConnection();

  return (
    <>
      {!isRunning && (
        <StartScreen />
      )}
      <ScoreBoard>Score: {score}</ScoreBoard>
      <canvas ></canvas>
    </>
  )
}

export default App
