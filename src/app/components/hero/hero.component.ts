import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DigitalWorldComponent } from '../digital-world/digital-world.component';
import { ParticleNetworkComponent } from '../particle-network/particle-network.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, DigitalWorldComponent, ParticleNetworkComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HeroComponent {

}
