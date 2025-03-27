import styled from '@emotion/styled';

const PauseScreenContainer = styled.div`
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

const PauseGameScreen = ({ resumeGame, score }: { resumeGame: () => void, score: number}) => {
    return (
      <PauseScreenContainer>
        <div>
          <Title>{"Ball Click Game"}</Title>
          <StartGameButton onClick={resumeGame}>Resume</StartGameButton>
          {
            <Score>Score: {score}</Score>
          }
        </div>
      </PauseScreenContainer>
    );
  };
  
  export default PauseGameScreen;