import { useEffect } from 'react';
import { useGameState } from '../state/GameState';

export function useGameLoop() {
    const { 
            setInitialized, 
            setScore, 
            isRunning, 
            isPaused, 
            endGame, 
            pausedRef,
            game
        } = useGameState();

    useEffect(() => {
        if (!game.canvas) {
            game.attachCanvas();
        }

        if (isRunning) {
            setInitialized(true);
            game.animate(
                setScore, 
                endGame,
                pausedRef, 
            );
        }
    }, [isPaused, isRunning, setInitialized])
}