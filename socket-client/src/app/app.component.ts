import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
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
  listMessages = [];
  constructor(private serviceWebsocket: AppService) {}
  ngOnInit() {
    this.serviceWebsocket
      .listen('connect')
      .subscribe((data) => console.log('CONNECTED'));
    this.serviceWebsocket.listen('users').subscribe((data: []) => {
      this.listUsers = data;
      this.online = data.length;
      console.log(this.listUsers.length);
    });
    this.serviceWebsocket.listen('message').subscribe((data) => {
      this.listMessages.push(data);
      console.log(data);
    });
  }

  cadastrarNome(nome) {
    this.serviceWebsocket.emit('register', nome);
    this.username = nome;
  }
  enviar() {
    console.log(this.messageTo);
    this.serviceWebsocket.emit('message', this.messageTo);
    this.messageTo.message = '';
  }
  selectUser(user) {
    this.messageTo.user = user;
  }
}
