import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {
  private socket?: Socket;
  public messages: Subject<string> = new Subject<string>();

  constructor() { }

  connectToDiscord() {
    // Reemplaza la URL con la URL de tu servidor socket.io
    this.socket = io('http://localhost:4332');

    this.socket.on('connect', () => {
      console.log('Connected to Discord server');
    });

    this.socket.on('msg', (message: string) => {
      this.messages.next(message);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Discord server');
    });
  }

  disconnectFromDiscord() {
    this.socket?.disconnect();
  }
}
