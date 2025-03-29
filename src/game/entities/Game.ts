/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */

// import gsap from "gsap";
import { Dispatch, RefObject } from "react";
import { Socket } from "socket.io-client";

import Player from "./Player"
import Projectile from "./Projectile"
import Particle from "./Particle"
import { throttle } from "../utils/util";
import { SERVER_TICK_RATE } from "./constants";

export default class Game {
    animationId: number = 0;
    spawnEnemiesIntervalId: number = 0

    totalScore: number = 0
    player: Player | null = null;
    enemies: Map<string, Player> = new Map<string, Player>();
    projectiles: Projectile[] = []
    particles: Particle[] = []

    canvas: HTMLCanvasElement | null = null;
    context: CanvasRenderingContext2D | null = null;

    socket?: Socket | null = null;

    throttledUpdate: (x: number, y: number) => void;

    constructor() {
        this.throttledUpdate = (x, y) => { console.log(x, y) };
    }

    attachCanvas(canvas?: HTMLCanvasElement) {
        this.canvas = !canvas ? document.querySelector('canvas') : canvas;
        this.context = this.canvas?.getContext('2d')!!;
        if (this.canvas) {
            this.canvas.width = 1280
            this.canvas.height = 720
        }
        this.totalScore = 0;
    }

    attachConnection(socket: Socket) {
        this.socket = socket;
        this.throttledUpdate = throttle((x: number, y: number) => {
            socket.emit('playerMovement', {
                playerId: socket.id,
                x: x,
                y: y
            })
        }, SERVER_TICK_RATE);
    }

    initPlayer(player: Player) {
        this.player = player
    }

    initEnemy(enemy: Player) {
        this.enemies.set(enemy.networkId!!, enemy);
    }

    updatePlayers() {
        if (!this.canvas || !this.context) return;

        this.player?.update(this.canvas, this.context)

        if (this.player?.velocity.x || this.player?.velocity.y && this.socket) {
            this.throttledUpdate(this.player.x, this.player.y);
        }
        this.enemies.forEach((enemy: Player) => {
            enemy.draw(this.context!!);
        })

        this.detectCollisions();
    }

    updateParticles() {
        if (!this.canvas || !this.context) return;

        this.particles.forEach((particle: Particle, index: number) => {
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1)
            } else {
                particle.update(this.context!!);
            }
        });
    }
    
    updateProjectiles() {
        if (!this.canvas || !this.context) return;

        for (let index = this.projectiles.length - 1; index >= 0; index--) {
            const projectile = this.projectiles[index]

            projectile.update(this.context)
        
            if (
              projectile.x - projectile.radius < 0 ||
              projectile.x - projectile.radius > this.canvas.width ||
              projectile.y + projectile.radius < 0 ||
              projectile.y - projectile.radius > this.canvas.height
            ) {
              const removedProjectiles: Projectile[] = this.projectiles.splice(index, 1);
              this.socket?.emit('projectileRemoved', removedProjectiles[0]);
            }
        }
    }

    detectCollisions() {
        if (!this.player) return;

        for (const projectile of this.projectiles) {
            if (!projectile.id.includes(this.player.networkId!!)) {
                const dist = Math.sqrt(
                    Math.pow((projectile.x - this.player.x), 2) + Math.pow((projectile.y - this.player.y), 2)
                )
                if (dist < this.player.radius) {
                    this.socket?.emit('playerCollision', this.player.networkId);
                }
            }
        }
    }

    animate(
        setScore: Dispatch<number>, 
        endGame: () => void,
        paused: RefObject<boolean>
    ) {
        if (this.context && this.canvas) {
            this.animationId = requestAnimationFrame(
                this.animate.bind(
                    this, setScore, endGame, paused
                ));
                this.context.fillStyle = 'rgba(0, 0, 0, 0.1)'
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
                
                this.updatePlayers();
                this.updateParticles();
                this.updateProjectiles();
        }
    }
            
    clearGameState() {
        this.particles.length = 0;
        this.projectiles.length = 0;
        this.enemies = new Map<string, Player>();
        this.player = null;
        this.totalScore = 0;
    }
}