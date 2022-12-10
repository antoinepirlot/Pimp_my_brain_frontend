import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
@Injectable()
export class CanActivateViaNotAuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        if (localStorage.getItem("token") === null) {
            return true;
        }
        else{
            console.log("logged");
            this.router.navigateByUrl('/')
            return false;
        }
    } 
}