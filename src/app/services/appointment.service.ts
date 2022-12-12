import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_errors';
import { environement } from 'src/environement/environement';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {
   }

   getAppointmentsByUser(id_student: number): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${environement.ROOT_URL}/appointments/${id_student}`).pipe(
      tap(_ => console.log('fetched appointments')),
      catchError(handleError))
   }
}
