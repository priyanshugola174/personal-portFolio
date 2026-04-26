import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
    this.renderer.setStyle(this.el.nativeElement, 'perspective', '1000px');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    this.renderer.setStyle(el, 'transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }
}
