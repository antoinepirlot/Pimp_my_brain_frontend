import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_error';
import { environement } from 'src/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {
   }

   getNotificationsByUser(id_user: number): Observable<Notification[]>{
    return this.http.get<Notification[]>(`${environement.ROOT_URL}/notifications/${id_user}`).pipe(
      tap(_ => console.log('fetched notifications')),
      catchError(handleError<Notification[]>('blabla', [])))
   }
}
