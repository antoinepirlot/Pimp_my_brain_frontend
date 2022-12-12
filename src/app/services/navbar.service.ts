import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {isConnected} from "../utils/utils";

@Injectable({providedIn: "root"})
export class NavbarService {
  private subjectName = new Subject<any>();

  sendUpdate() {
    this.subjectName.next(isConnected());
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable();
  }
}