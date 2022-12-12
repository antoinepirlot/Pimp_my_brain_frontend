import {environement} from "../../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import { handleError } from "../utils/handle_errors";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { Rating } from "../models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private ROOT_URL = environement.ROOT_URL;

  constructor(private http: HttpClient) {

  }

  getAllRatings(idTeacher: number): Observable<Rating[]> {
    const url: string = `${this.ROOT_URL}/ratings?id_teacher=`+idTeacher;
    return this.http.get<Rating[]>(url).pipe(
        catchError(handleError)
    );
  }
}
