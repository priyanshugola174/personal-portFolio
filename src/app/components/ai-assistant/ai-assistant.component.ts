import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AiService } from '../../services/ai.service';
import { LogService } from '../../services/log.service';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AiAssistantComponent {
  private aiService = inject(AiService);
  private logService = inject(LogService);
  
  isOpen = false;
  userInput = '';
  messages: Message[] = [
    { text: "Hi! I'm your real AI assistant powered by Gemini. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ];
  isTyping = false;

  // Format history for Gemini
  get chatHistory() {
    return this.messages.slice(1).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim() || this.isTyping) return;

    const query = this.userInput;
    this.userInput = '';
    
    // Add user message
    this.messages.push({ text: query, sender: 'user', timestamp: new Date() });
    
    this.isTyping = true;

    // Get response from AI Service
    const response = await this.aiService.getResponse(this.chatHistory, query);

    this.messages.push({ text: response, sender: 'ai', timestamp: new Date() });
    this.isTyping = false;

    // Save to logs
    this.logService.saveChat(this.messages.map(m => ({ text: m.text, sender: m.sender })));
  }
}
