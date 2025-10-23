import { Component } from '@angular/core';
import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-root',
  imports: [ChatComponent],
  template: `
    <app-chat></app-chat>
  `,
  styles: [],
})
export class App {}
