import { createContext, Dispatch, RefObject, useContext } from "react";
import Game from "../entities/Game";

export interface GameStateType {
    isRunning: boolean;
    isPaused: boolean;
    score: number;
    initialized: boolean;
    setInitialized: Dispatch<boolean>;
    setScore: Dispatch<number>;
    pauseGame: () => void;
    startGame: () => void;
    resumeGame: () => void;
    endGame: () => void;
    pausedRef: RefObject<boolean>;
    game: Game;
    setGame: Dispatch<Game>;
}
export const GameState = createContext<GameStateType | undefined>(undefined);

export const useGameState = () : GameStateType => {
    const context = useContext(GameState);
    if (!context) {
      throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};
