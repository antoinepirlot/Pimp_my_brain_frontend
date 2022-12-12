import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_error';
import { environement } from 'src/environement/environement';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {
  }

  getFavoritesByUser(id_user: number): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${environement.ROOT_URL}/favorites/${id_user}`).pipe(
      tap(_ => console.log('fetched notifications')),
      catchError(handleError<Favorite[]>('blabla', [])))
  }
}
