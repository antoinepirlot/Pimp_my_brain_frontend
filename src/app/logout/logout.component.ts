import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { HomeComponent } from "../home/home.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: "app-logout",
  template: ` <app-navbar></app-navbar> `,
  styles: [],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}


  ngOnInit(): void {
    console.log("deco");
    localStorage.clear();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    });

    
    
  }
}
