import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http:HttpClient) {
    this.ROOT_URL = 'http://127.0.0.1:5000'  
   }

   get(){
    return this.http.get(`${this.ROOT_URL}/util`)
   }
}
