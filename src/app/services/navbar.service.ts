import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {getIdUserConnected, isConnected} from "../utils/utils";

@Injectable({providedIn: "root"})
export class NavbarService {
  private subjectName = new Subject<any>();
  private idProfile = new Subject<number>()

  sendUpdate() {
    this.subjectName.next(isConnected());
    this.idProfile.next(getIdUserConnected());
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable();
  }

  getProfileId() {
    return this.idProfile.asObservable();
  }
}