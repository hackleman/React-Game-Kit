import Velocity from "./interfaces/Velocity"

export default class Projectile {
    x: number
    y: number
    radius: number
    color: string
    velocity: Velocity
    id: string

    constructor(x: number, y: number, radius: number, color: string, velocity: Velocity, id: string) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = velocity
      this.id = id;
    }
  
    draw(c: CanvasRenderingContext2D) {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
    }
  
    update(c: CanvasRenderingContext2D) {
      this.draw(c)
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
    }
}