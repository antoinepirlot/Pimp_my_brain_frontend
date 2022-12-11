import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { User } from "../models/user";
import { handleError } from "../utils/handle_errors";

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
            catchError(handleError));
    }

    
}