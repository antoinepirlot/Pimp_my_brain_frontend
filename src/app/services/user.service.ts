import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_errors';
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
      catchError(handleError))
   }

   addUser(user: User): Observable<User>{
    return this.http.post<User>(`${environement.ROOT_URL}/users`, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log('added user', newUser)),
      catchError(handleError))
   }

   getUserById(id: number): Observable<User> {
    const url: string = `${environement.ROOT_URL}/users/`+id;
    return this.http.get<User>(url).pipe(
        catchError(handleError)
    );
  }

   getUsersByEmail(email:string): Observable<User>{
    return this.http.get<User>(`${environement.ROOT_URL}/users/${email}`)
   }

   getUsersByPseudo(pseudo:string): Observable<User>{
    return this.http.get<User>(`${environement.ROOT_URL}/users/pseudo/${pseudo}`)
   }

   getUsersById(id:number): Observable<User>{
    return this.http.get<User>(`${environement.ROOT_URL}/users/${id}`)
   }

   getUserByToken(token:string): Observable<any>{
    return this.http.get<any>(`${environement.ROOT_URL}/authentications/token/${token}`).pipe(
      tap(_ => console.log('get info with token')),
      catchError(handleError))
   }

  }