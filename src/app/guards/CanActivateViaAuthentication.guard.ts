import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
@Injectable()
export class CanActivateViaAuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        if (localStorage.getItem("token") !== null) {
            return true;
        }
        else{
            this.router.navigateByUrl('/login')
            return false;
        }
    } 
}