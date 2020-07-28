import { Component, OnInit } from '@angular/core';

import { WebSocket } from 'src/app/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  username = null;
  listUsers = [];
  online = 0;
  messageTo = {
    user: {
      name: null,
      id: null,
    },
    message: '',
  };
  erro = null;
  listMessages = [];
  listMessagesFilter = [];
  constructor(private serviceWebsocket: WebSocket) {}
  ngOnInit() {
    this.serviceWebsocket
      .listen('connect')
      .subscribe((data) => console.log('CONNECTED'));
    this.serviceWebsocket.listen('users').subscribe((data: []) => {
      this.listUsers = data;
      this.online = data.length;
    });
    this.serviceWebsocket.listen('error').subscribe((data) => {
      this.erro = data;
      this.username = null;
    });
    this.serviceWebsocket.listen('register').subscribe((data) => {
      this.erro = null;
    });
    this.serviceWebsocket.listen('message').subscribe((data) => {
      this.listMessages.push(data);
      this.listMessagesFilter = this.listMessages;
    });
   
  }

  cadastrarNome(nome) {
    this.serviceWebsocket.emit('register', nome);
    this.username = nome;
  }
  enviar() {
    let message = this.messageTo.message;
    // this.listMessages.push({ user: this.messageTo.user, message });
    console.log('SEND');
    console.log(this.listMessages);
    this.serviceWebsocket.emit('message', this.messageTo);
    this.messageTo.message = '';
  }
  selectUser(user) {
    this.messageTo.user = user;
    if (this.username && this.listMessages) {
      this.listMessagesFilter = this.listMessages.filter((message) => {
        return (
          message.messageFrom.message.name == this.username 
        );
      });
    }
  }
}
