import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {handleError} from '../utils/handle_errors';
import {environement} from 'src/environement/environement';
import {Favorite} from '../models/favorite';
import {getToken} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  httpOptionsAuthorizeGet = {
    headers: new HttpHeaders({ "Authorization": getToken() }),
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': getToken(),
      'Content-Type': 'application/json'
    })
  };

  url: string = `${environement.ROOT_URL}/favorites`;

  constructor(private http: HttpClient) {
  }

  getFavoritesByUser(id_user: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${(this.url)}/${id_user}`, this.httpOptionsAuthorizeGet).pipe(
        tap(_ => console.log('fetched notifications')),
        catchError(handleError));
  }

  /**
   * Get the favorite of the connected user (it's requested with the token)
   */
  getUserProfileLike(id_teacher: number): Observable<Favorite> {
    return this.http.get<Favorite>(`${this.url}/one/${id_teacher}`, this.httpOptionsAuthorizeGet)
      .pipe(catchError(handleError));
  }

  addLike(id_teacher: number): Observable<Favorite> {
    let body = {"id_teacher": id_teacher}
    return this.http.post<Favorite>(`${this.url}/`, body, this.httpOptions)
    .pipe(catchError(handleError))
  }

  removeLike(id_teacher: number): Observable<Favorite> {
    return this.http.delete<Favorite>(`${this.url}/${id_teacher}`, this.httpOptionsAuthorizeGet)
      .pipe(catchError(handleError));
  }
}
