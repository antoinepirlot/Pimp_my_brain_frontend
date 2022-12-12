import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  user: User = {
    email: "",
    password: ""
  };
  messages: Message[] = [];
  chattingWith = new Subject<User>();

  constructor(private socket: Socket) {}

  sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data))
  }

  getUsers() {
    return this.socket.fromEvent('current_users').pipe(map((data: any) => data))
  }


}
