import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ROOT_URL = 'http://127.0.0.1:5000'

  constructor(private http:HttpClient) {
      
   }

   getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.ROOT_URL}/users`).pipe(
      tap(_ => console.log('fetched users')),
      catchError(this.handleError<User[]>('blabla', [])))
   }

     /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
