import Projectile from "../entities/Projectile";
import Game from "../entities/Game";

let projectileId = 1;

export const fireProjectile = (event: MouseEvent, game: Game) => {
    console.log('click');
    if (!game.canvas || !game.player) return;

    const angle = Math.atan2(
        event.clientY - game.player.y,
        event.clientX - game.player.x
    )

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    
    const projectile = new Projectile(game.player.x, game.player.y, 5, 'white', velocity, `${game.player.networkId!!}#${projectileId}`)
    game.projectiles.push(projectile);

    game.socket?.emit('projectileFired', {
        id: projectile.id,
        x: game.player.x,
        y: game.player.y,
        radius: 5,
        color: 'white',
        velocity: velocity,
    })
    projectileId += 1;
}