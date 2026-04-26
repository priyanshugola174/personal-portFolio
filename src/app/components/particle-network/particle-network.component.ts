import { Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-particle-network',
  standalone: true,
  template: `<canvas #particleCanvas></canvas>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0.8;
    }
  `]
})
export class ParticleNetworkComponent implements OnInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private mouse = { x: 0, y: 0 };

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    setTimeout(() => {
      this.resize();
      this.initParticles();
      this.animate();
    }, 100);
  }

  @HostListener('window:resize')
  resize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }

  initParticles() {
    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    // Increase count for full-screen coverage
    const count = 180;
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(canvas.width, canvas.height));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    this.particles.forEach((p, index) => {
      p.update(this.mouse, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      p.draw(this.ctx);

      // Connect particles
      for (let j = index + 1; j < this.particles.length; j++) {
        const dx = p.x - this.particles[j].x;
        const dy = p.y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 242, 254, ${0.4 * (1 - dist / 180)})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(width: number, height: number) {
    // Ensure particles are born across the entire canvas area
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 0.5;
  }

  update(mouse: { x: number, y: number }, width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      this.x -= dx / 20;
      this.y -= dy / 20;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
