import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from '../utils/handle_errors';
import { environement } from 'src/environement/environement';
import { Appointment } from '../models/appointment';
import { getToken } from "../utils/utils";

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
    let httpOptionsAuthorizeGet = {
      headers: new HttpHeaders({ "Authorization": getToken() }),
    };
    return this.http.get<Appointment[]>(`${environement.ROOT_URL}/appointments/${id_student}`, httpOptionsAuthorizeGet).pipe(
      tap(_ => console.log('fetched appointments')),
      catchError(handleError))
  }

  getAppointmentBYyCourseByUser(id_course:number,id_student: number): Observable<Appointment>{
    return this.http.get<Appointment>(`${environement.ROOT_URL}/appointments/${id_course}/${id_student}`).pipe(
      tap(_ => console.log('fetched appointment by course by user')),
      catchError(handleError))
  }

  update_appointment(id_course:number,id_student: number, state:string): Observable<Appointment>{
    return this.http.put<Appointment>(`${environement.ROOT_URL}/appointments/${id_course}/${id_student}/state/${state}`, this.httpOptions).pipe(
      catchError(handleError))
  }

  createAppointment(app: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${environement.ROOT_URL}/appointments/`, app, this.httpOptions).pipe(
      tap((newApp: Appointment) => console.log('added appointment', newApp)),
      catchError(handleError))
  }
}
