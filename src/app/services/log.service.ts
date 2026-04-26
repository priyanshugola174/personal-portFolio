import { Injectable } from '@angular/core';

export interface ChatLog {
  id: string;
  timestamp: Date;
  messages: { text: string; sender: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly STORAGE_KEY = 'portfolio_chat_logs';

  constructor() {}

  saveChat(messages: { text: string; sender: string }[]) {
    const logs = this.getAllLogs();
    const newLog: ChatLog = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
      messages
    };
    logs.unshift(newLog); // Newest first
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
  }

  getAllLogs(): ChatLog[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  clearLogs() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
