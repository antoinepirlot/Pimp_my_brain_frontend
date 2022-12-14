import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_errors';
import { environement } from 'src/environement/environement';
import {getToken} from "../utils/utils";



@Injectable({
  providedIn: 'root'
})
export class UserService {



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environement.ROOT_URL}/users`).pipe(
      tap(_ => console.log('fetched users')),
      catchError(handleError))
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environement.ROOT_URL}/users`, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log('added user', newUser)),
      catchError(handleError))
  }

  getUserById(id: number): Observable<User> {
    const url: string = `${environement.ROOT_URL}/users/` + id;
    return this.http.get<User>(url).pipe(
      catchError(handleError)
    );
  }
  getTeacherById(id: number): Observable<User> {
    const url: string = `${environement.ROOT_URL}/users/teacher/` + id;
    return this.http.get<User>(url).pipe(
      catchError(handleError)
    );
  }

  getUsersByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${environement.ROOT_URL}/users/${email}`)
  }

  getUsersByPseudo(pseudo: string): Observable<User> {
    return this.http.get<User>(`${environement.ROOT_URL}/users/pseudo/${pseudo}`)
  }

  getUserByToken(): Observable<User>{
    let httpOptionsWithAuth = {
      headers: new HttpHeaders({
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<User>(`${environement.ROOT_URL}/authentications/`, httpOptionsWithAuth).pipe(
      tap(_ => console.log('get info with token')),
      catchError(handleError))
  }

  getUsersById(id:number): Observable<User>{
    return this.http.get<User>(`${environement.ROOT_URL}/users/${id}`)
  }

}