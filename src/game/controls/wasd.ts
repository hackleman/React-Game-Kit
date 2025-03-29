import Game from "game/entities/Game";
import { directionMapping } from "./controls";

const activeKeys = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false
}

export const handleKeydown = (event: { key: string; }, game: Game) => {
    const control = directionMapping[event.key];

    if (control) {
        activeKeys[control] = true;
        updateVelocity(game);
    }
}

export const handleKeyUp = (event: { key: string; }, game: Game) => {
    const control = directionMapping[event.key];

    if (control) {
        activeKeys[control] = false;
        updateVelocity(game);
    }
}

const updateVelocity = (game: Game) => {
    const velocity = {
        x: 0,
        y: 0
    }

    if (activeKeys.UP) {
        velocity.y = -1;
    } else if (activeKeys.DOWN) {
        velocity.y = 1;
    }

    if (activeKeys.LEFT) {
        velocity.x = -1;
    } else if (activeKeys.RIGHT) {
        velocity.x += 1;
    }

    const normal = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    if (normal > 0) {
        velocity.x = velocity.x / normal;
        velocity.y = velocity.y / normal;
    }

    if (game.player) game.player.velocity = velocity;
}