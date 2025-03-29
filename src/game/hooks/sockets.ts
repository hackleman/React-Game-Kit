/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useGameState } from '../state/GameState';
import { addPlayer, initPlayer, removePlayer, updatePlayer } from '../network/player';
import Projectile from '../entities/Projectile';

export function useConnection() {
    const { game, isRunning, endGame } = useGameState();
    
    useEffect(() => {
        console.log(isRunning);
        
        if (isRunning) {
            window.localStorage.debug = 'socket.io-client:*'
            const conn = io('http://localhost:8080');

            game.attachConnection(conn);

            conn.on('start', (players_: string) => initPlayer(conn.id!!, game, players_));
            conn.on('newPlayer', (player_: string) => addPlayer(player_, game))
            conn.on('deletePlayer', (socketId: string) => removePlayer(socketId, game, endGame));
            conn.on('playerMoved', ({ playerId, x, y}) => updatePlayer(playerId, x, y, game));
            
            conn.on('projectileFired', (projectile) => {
                game.projectiles.push(
                    new Projectile(
                        projectile.x,
                        projectile.y,
                        projectile.radius,
                        projectile.color,
                        projectile.velocity,
                        projectile.id
                    )
                )
            })

            return () => {
                conn.close();
            }
        }
    }, [isRunning])
}