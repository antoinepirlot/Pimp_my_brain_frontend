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
export class UserService {

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {
      
   }

   getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environement.ROOT_URL}/users`).pipe(
      tap(_ => console.log('fetched users')),
      catchError(handleError<User[]>('blabla', [])))
   }

   addUser(user: User): Observable<User>{
    return this.http.post<User>(`${environement.ROOT_URL}/users`, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log('added user', newUser)),
      catchError(handleError<User>('addUser')))
   }

  }