import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: "app-logout",
  template: ` <app-navbar></app-navbar> `,
  styles: [],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private navbarService: NavbarService) {}


  ngOnInit(): void {
    
    localStorage.clear();
    this.router.navigateByUrl('').then(() => {
      this.navbarService.sendUpdate();
    });
  }
}
