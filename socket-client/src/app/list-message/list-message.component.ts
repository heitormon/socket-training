import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { WebSocket } from 'src/app/services/socket.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css'],
})
export class ListMessageComponent implements OnInit, OnChanges {
  @Input('username')
  username = '';
  @Input('listMessages')
  listMessages = [];
  listMessagesFilter = [];

  constructor(private serviceWebsocket: WebSocket) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('Change Username ' + this.username);
    if (this.username && this.listMessages) {
      this.listMessagesFilter = this.listMessages.filter((message) => {
        return message.messageFrom.message.name == this.username || message.user.name == this.username;
      });

    console.log(this.listMessagesFilter);
    }
  }

  ngOnInit(): void {
    this.listMessagesFilter = this.listMessages;
  }
}
