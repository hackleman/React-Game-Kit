import { useEffect } from 'react';
import { hydrateDOM } from './hydrate';
import Game from './entities/Game';
import { useGameState } from './entities/interfaces/GameState';

let game: Game;

export function useGameLoop(canvas: HTMLCanvasElement | null) {
    const { 
            setInitialized, 
            initialized,
            setScore, 
            isRunning, 
            isPaused, 
            pauseGame, 
            endGame, 
            pausedRef,
        } = useGameState();

    useEffect(() => {
        if (!canvas) return;

        const reset = !initialized || (!isRunning && !isPaused)
        
        if (reset)  {
            game = new Game(canvas);
            hydrateDOM(game, pause)
        }

        if (!isPaused && isRunning) {
            setInitialized(true);
            game.spawnEnemies();
            console.log(game.spawnEnemiesIntervalId)
            game.animate(
                setScore, 
                endGame,
                pausedRef, 
            );
        }
    }, [canvas, isPaused, isRunning, setInitialized])

    const pause = () => {
        console.log('call back clearing animationinterval', game.spawnEnemiesIntervalId)
        clearInterval(game.spawnEnemiesIntervalId)
        pauseGame();
    }
}