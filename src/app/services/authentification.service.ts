import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService{

    private ROOT_URL = 'http://localhost:5000'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor(private http: HttpClient){}

    login(user: User): Observable<string>{
        return this.http.post<string>(`${this.ROOT_URL}/authentications/login`, user, this.httpOptions).pipe(
          tap((token: string) => console.log('token :', token)),
          catchError(this.handleError<string>('login')))
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