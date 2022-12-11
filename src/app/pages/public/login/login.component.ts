import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthentificationService } from "../../../services/authentification.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  notification = "";

  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private router: Router,
    private authentificationService: AuthentificationService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let email = this.loginForm.value.email!;
    let password = this.loginForm.value.password!;
    if (this.loginForm.status === "INVALID") {
      this.notification = "Veuillez entrer tous les champs";
      return;
    }

    this.authentificationService
      .login({ email: email, password: password })
      .subscribe({
        next: (data) => {
          localStorage.setItem("token", data);
          this.router.navigateByUrl("/").then(() => {
            this.navbarService.sendUpdate();
          });
        },
        error: (error) => {
          if (error.status === 404) {
            this.notification = "L'email ou le mot de passe est incorrect";
          } else {
            console.warn("Server error");
          }
        },
      });
  }
}
