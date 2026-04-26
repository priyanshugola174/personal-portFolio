import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { AiAssistantComponent } from './components/ai-assistant/ai-assistant.component';
import { ServicesComponent } from './components/services/services.component';
import { AiCapabilitiesComponent } from './components/ai-capabilities/ai-capabilities.component';
import { BlogComponent } from './components/blog/blog.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { PreloaderComponent } from './components/preloader/preloader.component';

import { TiltDirective } from './directives/tilt.directive';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    AiAssistantComponent,
    ServicesComponent,
    AiCapabilitiesComponent,
    BlogComponent,
    ScrollRevealDirective,
    PreloaderComponent,
    CustomCursorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
  isLoading = true;

  onLoadingComplete() {
    this.isLoading = false;
  }
}
