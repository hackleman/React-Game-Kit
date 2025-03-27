import Projectile from "./entities/Projectile"
import Game from "./entities/Game"

export function hydrateDOM(game: Game, pause: () => void) {
    game.canvas.addEventListener('click', (event) => {
        const angle = Math.atan2(
            event.clientY - game.canvas.height / 2,
            event.clientX - game.canvas.width / 2
        )

        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        
        if (game.player) {
            const projectile = new Projectile(game.player.x, game.player.y, 5, 'white', velocity)
            game.projectiles.push(projectile);
        }
    })

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode == 27) {
            pause()
        }
    })
}