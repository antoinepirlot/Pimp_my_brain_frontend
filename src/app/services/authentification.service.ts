import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { User } from "../models/user";
import { throwError } from "rxjs";

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
            catchError(this.handleError))
       }

    
    private handleError(error : HttpErrorResponse) {
    return throwError(() => {
        if(error) throw error;
        else new Error('Server Error')}
        ); 
    }
}