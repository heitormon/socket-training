import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  username = null;
  online = 0;
  constructor(private serviceWebsocket: AppService) {
  }
  ngOnInit() {
    this.serviceWebsocket.listen('connect').subscribe((data) => console.log('CONNECTED'));
    this.serviceWebsocket.listen('users').subscribe((data: []) => this.online = data.length)

  }

  cadastrarNome(nome) {
    this.serviceWebsocket.emit('register', nome);
    this.username = nome;
  }
  voltar() {
    this.username = null;
  }

  enviar() {

  }
}
