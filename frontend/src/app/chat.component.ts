import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style="height: 90vh;">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold">Chatium</h1>
              <p class="text-indigo-200 text-sm">Chat with Claude</p>
            </div>
          </div>
          <button
            (click)="clearChat()"
            class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear</span>
          </button>
        </div>

        <!-- Messages Container -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50" #messagesContainer>
          <div *ngIf="messages.length === 0" class="flex items-center justify-center h-full text-gray-400">
            <div class="text-center">
              <svg class="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p class="text-xl">Start a conversation with Claude</p>
            </div>
          </div>

          <div *ngFor="let message of messages"
               [class]="message.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div [class]="message.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none px-6 py-3 max-w-2xl shadow-lg'
                  : 'bg-white text-gray-800 rounded-2xl rounded-tl-none px-6 py-3 max-w-2xl shadow-md border border-gray-200'">
              <div class="flex items-start space-x-2">
                <div class="flex-1">
                  <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
                  <p [class]="message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'"
                     class="text-xs mt-1">
                    {{ formatTimestamp(message.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="loading" class="flex justify-start">
            <div class="bg-white text-gray-800 rounded-2xl rounded-tl-none px-6 py-3 shadow-md border border-gray-200">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="bg-white border-t border-gray-200 p-6">
          <form (ngSubmit)="sendMessage()" class="flex items-center space-x-4">
            <input
              type="text"
              [(ngModel)]="newMessage"
              name="message"
              placeholder="Type your message..."
              [disabled]="loading"
              class="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              [disabled]="!newMessage.trim() || loading"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';
  loading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.loading) return;

    this.loading = true;
    const message = this.newMessage;
    this.newMessage = '';

    this.chatService.sendMessage(message).subscribe({
      next: () => {
        this.loading = false;
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.loading = false;
        this.newMessage = message;
      },
    });
  }

  clearChat() {
    if (confirm('Are you sure you want to clear all messages?')) {
      this.chatService.clearMessages().subscribe(() => {
        this.messages = [];
      });
    }
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private scrollToBottom() {
    const container = document.querySelector('.overflow-y-auto');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
