import Velocity from "./interfaces/Velocity"

export default class Player {
    x: number
    y: number
    radius: number
    color: string
    username: string | undefined
    networkId: string | undefined
    velocity: Velocity

    constructor(x: number, y: number, radius: number, color: string, username: string | undefined, networkId: string | undefined) {
      this.x = Math.round(x);
      this.y = Math.round(y);
      this.radius = radius
      this.color = color
      this.username = username;
      this.networkId = networkId;
      this.velocity = { x: 0, y: 0 }
    }
  
    draw(c: CanvasRenderingContext2D) {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
    }

    update(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D) {
      this.x = this.x + this.velocity?.x;
      this.y = this.y + this.velocity?.y;

      if (this.y < 0) this.y = 0;
      else if (this.y > canvas.height) this.y = canvas.height;

      if (this.x < 0) this.x = 0;
      else if (this.x > canvas.width) this.x = canvas.width;

      this.draw(c);
    }
}

export type PlayerMapEntry = [string, Player]