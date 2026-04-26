import { Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-digital-world',
  standalone: true,
  template: `<canvas #worldCanvas></canvas>`,
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
    }
  `]
})
export class DigitalWorldComponent implements OnInit, OnDestroy {
  @ViewChild('worldCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private points: Point3D[] = [];
  private animationId!: number;
  private angleX = 0;
  private angleY = 0;
  private mouseX = 0;
  private mouseY = 0;

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resize();
    this.initPoints();
    this.animate();
  }

  @HostListener('window:resize')
  resize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  initPoints() {
    this.points = [];
    const count = 500;
    const radius = 180;
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      this.points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      });
    }
  }

  animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Auto-rotate and mouse-tilt
    this.angleY += 0.005 + this.mouseX * 0.02;
    this.angleX += this.mouseY * 0.02;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Project and draw points
    this.points.forEach(p => {
      // Rotation matrices
      let x = p.x;
      let y = p.y;
      let z = p.z;

      // Rotate Y
      let cosY = Math.cos(this.angleY);
      let sinY = Math.sin(this.angleY);
      let nx = x * cosY - z * sinY;
      let nz = x * sinY + z * cosY;
      x = nx;
      z = nz;

      // Rotate X
      let cosX = Math.cos(this.angleX);
      let sinX = Math.sin(this.angleX);
      let ny = y * cosX - z * sinX;
      nz = y * sinX + z * cosX;
      y = ny;
      z = nz;

      // Perspective projection
      const perspective = 500 / (500 + z);
      const px = x * perspective + centerX;
      const py = y * perspective + centerY;

      // Depth-based styles
      const opacity = (z + 180) / 360;
      const size = perspective * 2;

      this.ctx.beginPath();
      this.ctx.arc(px, py, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 242, 254, ${opacity * 0.8})`;
      this.ctx.fill();

      // Add a small connecting line to neighbors occasionally for mesh feel
      if (Math.random() > 0.99) {
        this.ctx.strokeStyle = `rgba(79, 172, 254, ${opacity * 0.2})`;
        this.ctx.stroke();
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}
