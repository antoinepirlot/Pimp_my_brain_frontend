import {environement} from "../../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import { handleError } from "../utils/handle_errors";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { Rating } from "../models/rating";
import {getToken} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private ROOT_URL = environement.ROOT_URL;

  httpOptionsAuthorizeGet = {
    headers: new HttpHeaders({ 'Authorization': getToken() })
  };
  private httpOptionsAuthorizePost = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': getToken()
    })
  }

  constructor(private http: HttpClient) {

  }

  getAllRatings(idTeacher: number): Observable<Rating[]> {
    const url: string = `${this.ROOT_URL}/ratings?id_teacher=`+idTeacher;
    return this.http.get<Rating[]>(url).pipe(
        catchError(handleError)
    );
  }

  createOneRating(rating: Rating): Observable<Rating>{
    return this.http.post<Rating>(`${environement.ROOT_URL}/ratings/`, rating, this.httpOptionsAuthorizePost).pipe(
      catchError(handleError))
   }
}
