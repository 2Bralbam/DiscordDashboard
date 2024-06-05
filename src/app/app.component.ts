import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiscordService } from './discord.service';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

interface MsgObject {
  username: string;
  command: string;
  fecha: Date;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  messages: MsgObject[] = [];
  private messagesSubscription?: Subscription;

  constructor(private discordService: DiscordService) { }

  ngOnInit() {
    this.discordService.connectToDiscord();
    this.messagesSubscription = this.discordService.messages.subscribe((message) => {
      let msg:MsgObject = JSON.parse(message);
      this.messages.push(msg);
    });
  }

  ngOnDestroy() {
    this.discordService.disconnectFromDiscord();
    this.messagesSubscription?.unsubscribe();
  }
}
