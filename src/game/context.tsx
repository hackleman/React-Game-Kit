import { ReactNode, useRef, useState } from 'react';
import { GameState, GameStateType } from './entities/interfaces/GameState';

export const GameStateProvider = ({ children } : {children: ReactNode }) => {
    const [initialized, setInitialized] = useState(false)
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);

    const pausedRef = useRef(false);

    const pauseGame = () => {
        setIsRunning(true);
        setIsPaused(true);
        pausedRef.current = true;
    }

    const startGame = () => {
        setScore(0);
        setIsRunning(true);
        setIsPaused(false);
        pausedRef.current = false;
    }

    const resumeGame = () => {
        setIsRunning(true);
        setIsPaused(false);
        pausedRef.current = false;
    }

    const endGame = () => {
        setIsRunning(false);
        setIsPaused(false);
        pausedRef.current = false;
    }

    const value: GameStateType = {
        isRunning,
        isPaused,
        score,
        initialized,
        setInitialized,
        setScore,
        pauseGame,
        startGame,
        resumeGame,
        endGame,
        pausedRef,
    }

    return <GameState.Provider value={value}>{children}</GameState.Provider>
}