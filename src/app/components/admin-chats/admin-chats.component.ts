import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogService, ChatLog } from '../../services/log.service';

@Component({
  selector: 'app-admin-chats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-chats.component.html',
  styleUrl: './admin-chats.component.css'
})
export class AdminChatsComponent {
  private logService = inject(LogService);
  
  password = '';
  isAuthorized = false;
  logs: ChatLog[] = [];
  selectedLog: ChatLog | null = null;

  // You can change this password
  private readonly ADMIN_PASSWORD = 'admin123';

  checkPassword() {
    if (this.password === this.ADMIN_PASSWORD) {
      this.isAuthorized = true;
      this.loadLogs();
    } else {
      alert('Incorrect Password!');
    }
  }

  loadLogs() {
    this.logs = this.logService.getAllLogs();
  }

  selectLog(log: ChatLog) {
    this.selectedLog = log;
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all logs?')) {
      this.logService.clearLogs();
      this.loadLogs();
      this.selectedLog = null;
    }
  }
}
