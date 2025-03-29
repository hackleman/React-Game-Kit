import { attachControls } from "../controls";
import Game from "../entities/Game";
import Player, { PlayerMapEntry } from "../entities/Player";

export const initPlayer = (connId: string, game: Game, players_: string) => {
    const entities: PlayerMapEntry[] = JSON.parse(players_);
    const players = entities.filter((entity) => entity[0] == connId);
    const enemies = entities.filter((entity) => entity[0] !== connId);
    
    if (players.length > 0) {
        const player = players[0][1]
        if (player) {
            game.initPlayer(new Player(
                player.x,
                player.y,
                player.radius,
                player.color,
                player.username,
                player.networkId
            ))
        }
    }
    
    if (enemies.length > 0) {
        enemies
            .map((enemy) => enemy[1])
            .forEach((enemy: Player) => {
                game.initEnemy(new Player(
                    enemy.x,
                    enemy.y,
                    enemy.radius,
                    enemy.color,
                    enemy.username,
                    enemy.networkId
                ));
            });
    }

    attachControls(game);
}

export const addPlayer = (player_: string, game: Game) => {
    const player: Player = JSON.parse(player_);

    if (player.networkId) {
        game.enemies.set(player.networkId, new Player(
            player.x,
            player.y,
            player.radius,
            player.color,
            player.username,
            player.networkId
        ));
    }
}

export const removePlayer = (socketId: string, game: Game, endGame: () => void) => {
    if (!game.player) return;

    if (game.player.networkId == socketId) {
        endGame();
    } else {
        game.initParticles(socketId);
        game.enemies.delete(socketId);
    }
}

export const updatePlayer = (socketId: string, x: number, y: number, game: Game) => {
    const enemy: Player | undefined = game.enemies.get(socketId);
    if (enemy) {
        enemy.x = x;
        enemy.y = y;
    }
}