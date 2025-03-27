/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */

import gsap from "gsap";
import { Dispatch, RefObject } from "react";
import Player from "./Player"
import Projectile from "./Projectile"
import Enemy from "./Enemy"
import Particle from "./Particle"

export default class Game {
    animationId: number = 0;
    spawnEnemiesIntervalId: number = 0

    totalScore: number = 0

    projectiles: Projectile[] = []
    enemies: Enemy[] = []
    particles: Particle[] = []
    player: Player | null = null;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!!;
        this.player = this.initPlayer();
    }

    initPlayer(): Player {
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        
        const x = this.canvas.width / 2
        const y = this.canvas.height / 2
    
        this.totalScore = 0;

        return new Player(x, y, 10, 'white')
    }

    updateParticles() {
        this.particles.forEach((particle: Particle, index: number) => {
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1)
            } else {
                particle.update(this.context);
            }
        });
    }
    
    updateProjectiles() {
        for (let index = this.projectiles.length - 1; index >= 0; index--) {
            const projectile = this.projectiles[index]
        
            projectile.update(this.context)
        
            if (
              projectile.x - projectile.radius < 0 ||
              projectile.x - projectile.radius > this.canvas.width ||
              projectile.y + projectile.radius < 0 ||
              projectile.y - projectile.radius > this.canvas.height
            ) {
              this.projectiles.splice(index, 1)
            }
        }
    }
    
    clearGameState() {
        console.log('clearing');
        this.particles.length = 0;
        this.projectiles.length = 0;
        this.enemies.length = 0;
        this.player = null;
        this.totalScore = 0;
    }

    spawnEnemies() {
        this.spawnEnemiesIntervalId = setInterval(() => {
            const radius = Math.random() * (30 - 4) + 4
    
            let x
            let y
    
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : this.canvas.width + radius
                y = Math.random() * this.canvas.height
            } else {
                x = Math.random() * this.canvas.width
                y = Math.random() < 0.5 ? 0 - radius : this.canvas.height + radius
            }
    
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    
            const angle = Math.atan2(this.canvas.height / 2 - y, this.canvas.width / 2 - x)
    
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
    
            this.enemies.push(new Enemy(x, y, radius, color, velocity))
        }, 1000)
    }

    animate(
        setScore: Dispatch<number>, 
        endGame: () => void,
        paused: RefObject<boolean>
    ) {
        if (paused.current == false  && this.player) {
            this.animationId = requestAnimationFrame(
                this.animate.bind(
                    this, setScore, endGame, paused
                ));
            this.context.fillStyle = 'rgba(0, 0, 0, 0.1)'
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
            
            this.player.draw(this.context)
    
            this.updateParticles();
            this.updateProjectiles();

            for (let index = this.enemies.length - 1; index >= 0; index--) {
                const enemy = this.enemies[index]
            
                enemy.update(this.context)
            
                const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y)
            
                //end game
                if (dist - enemy.radius - this.player.radius < 1) {
                    cancelAnimationFrame(this.animationId);
                    clearInterval(this.spawnEnemiesIntervalId);
                    this.clearGameState();
                    endGame();                    
                }
            
                for (
                    let projectilesIndex = this.projectiles.length - 1;
                    projectilesIndex >= 0;
                    projectilesIndex--
                ) {
                    const projectile = this.projectiles[projectilesIndex]
                
                    const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
                
                    if (dist - enemy.radius - projectile.radius < 1) {
                        for (let i = 0; i < enemy.radius * 2; i++) {
                        this.particles.push(
                            new Particle(
                                projectile.x,
                                projectile.y,
                                Math.random() * 2,
                                enemy.color,
                                {
                                    x: (Math.random() - 0.5) * (Math.random() * 6),
                                    y: (Math.random() - 0.5) * (Math.random() * 6)
                                }
                            )
                        )
                        }
        
                        if (enemy.radius - 10 > 5) {
                            this.totalScore += 100;
                            setScore(this.totalScore)
                            gsap.to(enemy, {
                                radius: enemy.radius - 10
                            })
                            this.projectiles.splice(projectilesIndex, 1)
                        } else {
                            this.totalScore += 150
                            setScore(this.totalScore)
                            this.enemies.splice(index, 1)
                            this.projectiles.splice(projectilesIndex, 1)
                        }
                    }
                }
            }
        }
    }
}