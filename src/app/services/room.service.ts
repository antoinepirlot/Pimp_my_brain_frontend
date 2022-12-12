import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { User } from '../models/user';
import { Socket } from 'ngx-socket-io';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from '../models/message';
import { Subject } from 'rxjs';
import { ChatRoom } from '../models/chat_rooms';
import { environement } from 'src/environement/environement';
import { handleError } from '../utils/handle_errors';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor (
    private socket: Socket,
    private http:HttpClient
  ) {}

  getChatRoomById(id_room: string): Observable<ChatRoom>{
    return this.http.get<ChatRoom>(`${environement.ROOT_URL}/chat_rooms/getRoomById/${id_room}`).pipe(
      tap(_ => console.log('fetched notifications')),
      catchError(handleError));
  }

  sendMessage(message: string, id_room: string, username: string) {
    this.socket.emit('message', message, id_room, username);
  }

  joinRoom(username: string, id_room: string) {
    this.socket.emit('join', username, id_room)
  }

  leaveRoom(username: string, id_room: string) {
    this.socket.emit('left', username, id_room)
  }

  getStatus(): Observable<Message> {
    this.socket.fromEvent('status').pipe(map((data: any) => data)).subscribe( {
      next: (data) => {
        console.log(data)
      }
    })
    return this.socket.fromEvent('status').pipe(map((data: any) => data))
  }

  getStatusLeft(): Observable<Message> {
    this.socket.fromEvent('statusLeft').pipe(map((data: any) => data)).subscribe( {
      next: (data) => {
        console.log(data)
      }
    })
    return this.socket.fromEvent('status').pipe(map((data: any) => data))
  }

  getMessage(): Observable<Message> {
    this.socket.fromEvent('message').pipe(map((data: any) => data)).subscribe( {
      next: (data) => {
        console.log(data)
      }
    })
    return this.socket.fromEvent('message').pipe(map((data: any) => data))
  }

  getUsers() {
    return this.socket.fromEvent('current_users').pipe(map((data: any) => data))
  }


}
