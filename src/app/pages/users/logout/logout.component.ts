import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
    this.router.navigateByUrl('').then();
  }
}
