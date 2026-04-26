import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '../config/ai.config';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(AI_CONFIG.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: AI_CONFIG.model,
      systemInstruction: AI_CONFIG.systemInstruction
    });
  }

  async getResponse(history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> {
    try {
      if (AI_CONFIG.geminiApiKey === 'REPLACE_WITH_YOUR_GEMINI_API_KEY') {
        return "Hey! To make me a 'Real AI', please add your Gemini API Key in `src/app/config/ai.config.ts`. For now, I'm just a demo!";
      }

      const chat = this.model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Service Error:', error);
      return "Oops! I'm having trouble connecting to my brain right now. Please check the console or try again later.";
    }
  }
}
