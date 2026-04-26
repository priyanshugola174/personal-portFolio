import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preloader-overlay">
      <div class="preloader-content">
        <div class="loader-visual">
          <div class="scan-line"></div>
          <div class="logo-text">P-G</div>
        </div>
        
        <div class="loading-bar-container">
          <div class="loading-bar" [style.width.%]="progress"></div>
        </div>
        
        <div class="system-logs">
          <span class="cursor">></span> {{ currentLog }}
        </div>

        <div class="percentage">{{ progress }}%</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #000;
    }
    .preloader-overlay {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #00f2fe;
      font-family: 'Courier New', Courier, monospace;
    }
    .preloader-content {
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .loader-visual {
      position: relative;
      width: 120px;
      height: 120px;
      border: 2px solid #00f2fe;
      margin: 0 auto 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
    }
    .scan-line {
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to bottom, transparent, #00f2fe);
      opacity: 0.3;
      animation: scan 2s linear infinite;
    }
    .logo-text {
      font-size: 2rem;
      font-weight: 900;
      letter-spacing: 5px;
      text-shadow: 0 0 10px #00f2fe;
    }
    .loading-bar-container {
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      margin-bottom: 20px;
    }
    .loading-bar {
      height: 100%;
      background: #00f2fe;
      box-shadow: 0 0 10px #00f2fe;
      transition: width 0.1s ease;
    }
    .system-logs {
      font-size: 0.8rem;
      height: 20px;
      margin-bottom: 10px;
      opacity: 0.8;
    }
    .percentage {
      font-size: 0.7rem;
      opacity: 0.5;
    }
    @keyframes scan {
      from { top: -100%; }
      to { top: 200%; }
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
  `]
})
export class PreloaderComponent implements OnInit {
  @Output() loadingComplete = new EventEmitter<void>();
  
  progress = 0;
  currentLog = 'INITIALIZING NEURAL CORE...';
  logs = [
    'CONNECTING TO GLOBAL NODE NETWORK...',
    'SYNCING FULL-STACK MODULES (REACT/NODE)...',
    'CALIBRATING AI INTELLIGENCE V1.0...',
    'OPTIMIZING SCALABILITY PARAMETERS...',
    'GDPR COMPLIANCE CHECK: PASSED.',
    'PRIYANSHU-GOLA_OS LOADED.',
    'SYSTEM READY.'
  ];
  
  private logIndex = 0;

  ngOnInit() {
    this.startLoading();
  }

  startLoading() {
    const logInterval = setInterval(() => {
      this.currentLog = this.logs[this.logIndex];
      this.logIndex++;
      
      if (this.logIndex >= this.logs.length) {
        clearInterval(logInterval);
      }
    }, 250);

    const progressInterval = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          this.loadingComplete.emit();
        }, 500);
      }
    }, 30);
  }
}
