import styled from '@emotion/styled';
import { useGameState } from '../../game/state/GameState';

const StartGameContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw; /* 80% of viewport width */
  height: 80vh; /* 80% of viewport height */
  margin: auto; /* Center the container */
  background-color: transparent; /* Make the background transparent */
`;

const StartGameButton = styled.button`
  padding: 16px 32px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background-color: #007bff; /* Blue button */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }

  &:active {
    background-color: #004080; /* Even darker blue on active */
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: white;
  margin-bottom: 24px;
  text-align: left;
`;

const Score = styled.h1`
  font-size: 36px;
  color: white;
  margin-bottom: 24px;
  text-align: left;
`;

const StartGameScreen = () => {
  const { initialized, score, startGame } = useGameState();
  
    return (
      <StartGameContainer>
        <div>
          <Title>{!initialized ? "Ball Click Game!" : "Nice Try!"}</Title>
          <StartGameButton onClick={startGame}>
            {!initialized ? "Start Game" : "Retry?"}
          </StartGameButton>
          {
            initialized && <Score>Total Score: {score}</Score>
          }
        </div>
      </StartGameContainer>
    );
  };
  
  export default StartGameScreen;