import Game from "game/entities/Game"

export const handleScreenFocus = (event: FocusEvent, game: Game) => {
    if (game && game.player) {
        game.player.velocity = {
            x: 0,
            y: 0
        }
    }
}