import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-dot" [ngStyle]="dotStyle"></div>
    <div class="cursor-ring" [ngStyle]="ringStyle"></div>
  `,
  styles: [`
    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background-color: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px var(--primary);
    }
    .cursor-ring {
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, background-color 0.3s;
    }
    @media (max-width: 768px) {
      .cursor-dot, .cursor-ring { display: none; }
    }
  `]
})
export class CustomCursorComponent implements OnInit {
  dotStyle = { left: '0px', top: '0px' };
  ringStyle = { left: '0px', top: '0px', width: '40px', height: '40px' };

  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;

  constructor() {}

  ngOnInit() {
    this.animate();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.dotStyle.left = `${this.mouseX}px`;
    this.dotStyle.top = `${this.mouseY}px`;

    // Check if hovering over interactive element
    const target = e.target as HTMLElement;
    if (target.closest('button, a, .project-card, .glass-card')) {
      this.ringStyle.width = '60px';
      this.ringStyle.height = '60px';
    } else {
      this.ringStyle.width = '40px';
      this.ringStyle.height = '40px';
    }
  }

  private animate() {
    const ease = 0.15;
    this.ringX += (this.mouseX - this.ringX) * ease;
    this.ringY += (this.mouseY - this.ringY) * ease;
    
    this.ringStyle.left = `${this.ringX}px`;
    this.ringStyle.top = `${this.ringY}px`;

    requestAnimationFrame(() => this.animate());
  }
}
