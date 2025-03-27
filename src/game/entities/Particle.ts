import Velocity from "./interfaces/Velocity.ts"

export default class Particle {
    x: number
    y: number
    radius: number
    color: string
    velocity: Velocity
    alpha: number

    constructor(x: number, y: number, radius: number, color: string, velocity: Velocity) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = velocity
      this.alpha = 1
    }
  
    draw(c: CanvasRenderingContext2D) {
      c.save()
      c.globalAlpha = this.alpha
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
      c.restore()
    }
  
    update(c: CanvasRenderingContext2D) {
      this.draw(c)
      this.velocity.x *= 0.99
      this.velocity.y *= 0.99
      this.x = this.x + this.velocity.x
      this.y = this.y + this.velocity.y
      this.alpha -= 0.01
    }
  }
  