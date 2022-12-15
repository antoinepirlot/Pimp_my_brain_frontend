import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { Notification } from "../models/notification";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_errors';
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
      catchError(handleError))
   }

   createNotification(notif: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${environement.ROOT_URL}/notifications`, notif, this.httpOptions).pipe(
      tap((newNotif: Notification) => console.log('added notification', newNotif)),
      catchError(handleError))
  }

  getNotificationsNotSeen(id_user: number): Observable<Notification[]>{
    return this.http.get<Notification[]>(`${environement.ROOT_URL}/notifications/newNotif/${id_user}`).pipe(
      tap(_ => console.log('fetched notifications not seen from user')),
      catchError(handleError))
   }

   update_notification(id_notification:number): Observable<Notification>{
    return this.http.put<Notification>(`${environement.ROOT_URL}/notifications/update/${id_notification}`, this.httpOptions).pipe(
      catchError(handleError))
  }
}
