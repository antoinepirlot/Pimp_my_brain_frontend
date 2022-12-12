import {environement} from "../../environement/environement";
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Course} from "../models/course";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "../utils/handle_error";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private ROOT_URL = environement.ROOT_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) {

  }
  createOneCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${environement.ROOT_URL}/courses/`, course, this.httpOptions).pipe(
      catchError(handleError<Course>('createOneCourse')))
   }


  getCourser(): Observable<Course[]>{
    const url: string = `${this.ROOT_URL}/courses`;
    return this.http.get<Course[]>(url, this.httpOptions).pipe(
        catchError(handleError<Course[]>('getAllTeacherCourses'))
    );
   }

  getAllTeacherCourses(idTeacher: number): Observable<Course[]> {
    const url: string = `${this.ROOT_URL}/courses/teacher/${idTeacher}`;
    return this.http.get<Course[]>(url, this.httpOptions).pipe(
        catchError(handleError<Course[]>('getAllTeacherCourses'))
    );
  }

  getOneCourse(idCourse: number) {
    const url: string = `${this.ROOT_URL}/courses/${idCourse}`;
    return this.http.get<Course>(url, this.httpOptions).pipe(
        catchError(handleError<Course>("getOneCourse"))
    );
  }
}