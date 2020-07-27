import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  socket: any;
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }
  sendUserName(id: string) {
    this.socket.emit('register', id);
  }
  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
  getUsers() {
    return this.http.get('http://localhost:3000/users').subscribe((data) => {
      console.log(data);
    });
  }
}
