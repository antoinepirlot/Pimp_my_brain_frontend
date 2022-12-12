import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_error';
import { environement } from 'src/environement/environement';
import { Favorite } from '../models/favorite';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
