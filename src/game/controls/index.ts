import Game from "../entities/Game"
import { handleKeydown, handleKeyUp } from "./wasd"
import { fireProjectile } from "./leftclick"
import { handleScreenFocus } from "./screen"

export function attachControls(game: Game) {
    if (game.canvas) {
        game.canvas.addEventListener('click', (event) => fireProjectile(event, game))
    }

    document.addEventListener('keydown', (event) => handleKeydown(event, game))
    document.addEventListener('keyup', (event) => handleKeyUp(event, game))

    window.addEventListener('blur', (event) => handleScreenFocus(event, game))
}

export function detachControls(game: Game) {
    if (game.canvas) {
        game.canvas.removeEventListener('click', (event) => fireProjectile(event, game))
        const parent = game.canvas?.parentNode;
        console.log('cleaning up DOM', game.canvas, parent);
        parent?.removeChild(game.canvas);
    
        const replacement = document.createElement('canvas');
        replacement.width = 1280;
        replacement.height = 720
        parent?.appendChild(replacement);
    
        game.attachCanvas(replacement);
    }
    document.removeEventListener('keydown', (event) => handleKeydown(event, game))
    document.removeEventListener('keyup', (event) => handleKeyUp(event, game))

    window.removeEventListener('blur', (event) => handleScreenFocus(event, game));
}