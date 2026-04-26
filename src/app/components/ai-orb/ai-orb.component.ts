import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-orb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orb-container">
      <div class="orb" [style.transform]="orbTransform">
        <div class="orb-inner"></div>
        <div class="orb-glow"></div>
        <div class="orb-ring"></div>
      </div>
      <div class="particles">
        <div *ngFor="let p of [1,2,3,4,5]" class="particle"></div>
      </div>
    </div>
  `,
  styleUrl: './ai-orb.component.css'
})
export class AiOrbComponent {
  orbTransform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = (event.clientX / window.innerWidth - 0.5) * 30;
    const y = (event.clientY / window.innerHeight - 0.5) * 30;
    this.orbTransform = `translate(${x * 0.5}px, ${y * 0.5}px) rotateX(${-y}deg) rotateY(${x}deg)`;
  }
}
