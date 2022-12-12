import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_errors';
import { environement } from 'src/environement/environement';
import { Favorite } from '../models/favorite';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private socket: Socket) {}
  
  login(id_user1: number, id_user2: number) {
    this.socket.emit('sign_in', id_user1, id_user2)
  }

  getRoomId() {
    return this.socket.fromEvent('room_id').pipe(map((data: any) => data));
  }
  
}
