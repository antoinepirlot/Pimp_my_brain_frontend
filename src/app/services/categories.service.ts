import {environement} from "../../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import { handleError } from "../utils/handle_errors";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private ROOT_URL = environement.ROOT_URL;

  constructor(private http: HttpClient) {

  }

  getAllCategories(): Observable<Category[]> {
    const url: string = `${this.ROOT_URL}/categories/`;
    return this.http.get<Category[]>(url).pipe(
        catchError(handleError)
    );
  }
}
