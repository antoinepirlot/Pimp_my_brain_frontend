import {environement} from "../../environement/environement";
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Course} from "../models/course";
import {catchError} from "rxjs/operators";
import {handleError} from "../utils/handle_errors";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { throwError } from "rxjs";
import {getToken} from "../utils/utils";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private ROOT_URL = environement.ROOT_URL;
  httpOptionsAuthorizeGet = {
    headers: new HttpHeaders({ 'Authorization': getToken() })
  };
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) {

  }
  createOneCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${environement.ROOT_URL}/courses/`, course, this.httpOptions).pipe(
      catchError(handleError))
   }


  getCourses(filterObject ?: any): Observable<Course[]>{
    let filter = ""
    if(filterObject) {
      if(filterObject.optionChosen==="Tous") filterObject.optionChosen="";
      filter=`city=${filterObject.city}&course=${filterObject.optionChosen}&description=${filterObject.description}`
    }
    const url: string = `${this.ROOT_URL}/courses?` + filter;
    return this.http.get<Course[]>(url, this.httpOptions).pipe(
        catchError(handleError)
    );
   }

  getAllTeacherCourses(): Observable<Course[]> {
    let httpOptionsWithAuth = {
      headers: new HttpHeaders({
        "Authorization": getToken()!,
        "Content-Type": "application/json"
      })
    }
    const url: string = `${this.ROOT_URL}/courses/teacher`;
    return this.http.get<Course[]>(url, httpOptionsWithAuth).pipe(
        catchError(handleError)
    );
  }

  getOneCourse(idCourse: number) {
    let httpOptionsAuthorizeGet = {
      headers: new HttpHeaders({ Authorization: getToken() }),
    };
    const url: string = `${this.ROOT_URL}/courses/${idCourse}`;
    return this.http.get<Course>(url, httpOptionsAuthorizeGet).pipe(
        catchError(handleError)
    );
  }

}