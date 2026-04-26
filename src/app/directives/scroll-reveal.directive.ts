import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay: number = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {
    // Initial state: hidden
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transform = 'translateY(30px)';
    this.el.nativeElement.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
  }

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.el.nativeElement.style.opacity = '1';
            this.el.nativeElement.style.transform = 'translateY(0)';
          }, this.revealDelay);
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -50px 0px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
