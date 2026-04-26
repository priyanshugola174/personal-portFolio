import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  challenge: string;
  solution: string;
  outcome: string;
  link?: string;
  github?: string;
}

import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      id: 1,
      title: 'Global Social Engine',
      category: 'Scalable Architecture',
      description: 'A high-performance social networking core designed for millions of concurrent users.',
      tags: ['Node.js', 'Redis', 'WebSockets', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
      challenge: 'Handling real-time notifications and feed updates across geographically distributed servers with sub-100ms latency.',
      solution: 'Implemented a Redis-backed pub/sub system with multi-layer caching and an optimized database indexing strategy.',
      outcome: 'Successfully scaled to 500k+ active users with 99.9% uptime and significant reduction in infrastructure costs.'
    },
    {
      id: 2,
      title: 'AI Product Intelligence',
      category: 'AI & Data',
      description: 'Automated insight engine that processes customer feedback using LLMs.',
      tags: ['Python', 'OpenAI', 'React', 'FastAPI'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      challenge: 'Extracting actionable product insights from thousands of unstructured customer reviews across multiple platforms.',
      solution: 'Developed a custom NLP pipeline using GPT-4 for sentiment analysis and thematic clustering, visualized in a real-time dashboard.',
      outcome: 'Reduced product research time by 70% and identified 3 critical UI/UX pain points that were previously overlooked.'
    },
    {
      id: 3,
      title: 'GDPR Compliance Vault',
      category: 'Security & Privacy',
      description: 'Zero-knowledge encryption vault for sensitive PII data management.',
      tags: ['Security', 'Encryption', 'TypeScript', 'Compliance'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      challenge: 'Storing sensitive user data in a way that is fully GDPR compliant while maintaining high search performance.',
      solution: 'Built a pseudonymization layer that encrypts data at rest and in transit, using field-level encryption with rotation policies.',
      outcome: 'Passed 3rd party security audits with zero findings and enabled the client to expand into the EU market confidently.'
    }
  ];

  openModal(project: Project) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeModal() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}
