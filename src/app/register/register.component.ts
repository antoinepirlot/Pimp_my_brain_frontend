import { Component, Input } from "@angular/core";
import { UserService } from "../users/user.service";
import { User } from "../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  notification = "";
  bool: boolean = false;

  allOptions = ["Homme", "Femme", "Autre"];

  registerForm = new FormGroup({
    lastname: new FormControl("", Validators.required),
    firstname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    pseudo: new FormControl("", Validators.required),
    sexe: new FormControl(this.allOptions[0], Validators.required),
    phone: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    Cpassword: new FormControl("", Validators.required),
  });

  user: User = {
    lastname: "",
    firstname: "",
    email: "",
    pseudo: "",
    sexe: "",
    phone: "",
    password: "",
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.notification = "";

    if (this.registerForm.status === "INVALID") {
      this.notification = "Veuillez entrer tous les champs";
      return;
    }

    if (this.registerForm.value.Cpassword != this.registerForm.value.password) {
      this.notification = "Verifiez votre mot de passe";
      return;
    }

    this.user.lastname = this.registerForm.value.lastname!;
    this.user.firstname = this.registerForm.value.firstname!;
    this.user.email = this.registerForm.value.email!;
    this.user.pseudo = this.registerForm.value.pseudo!;

    if ((this.registerForm.value.sexe = "Homme")) {
      this.user.sexe = "male";
    } else if ((this.registerForm.value.sexe = "Femme")) {
      this.user.sexe = "female";
    } else {
      this.user.sexe = "other";
    }

    this.user.phone = this.registerForm.value.phone!;
    this.user.password = this.registerForm.value.password!;

    console.log(this.user);

    this.checkPseudoAndEmail(this.user)

    //Wait 2 seconds before redirect
  }

  addUser(user: User): void {
    console.log(user);
    this.userService.addUser(user).subscribe({
      //if ok
      next: () => {
        setTimeout(() => this.router.navigateByUrl("/login"), 2000);
      }
    });
    this.bool = true;
    this.notification = "Bravo ! Vous êtes inscrit";
  }

  checkPseudoAndEmail(user: User): void {
    this.userService.getUsersByEmail(user.email).subscribe({
      next: () => {
        this.notification = "email déjà utilisé";
      },
      error: (error) => {
        if (error.status === 404) {
          this.userService.getUsersByPseudo(user.pseudo!).subscribe({
            next: () => {
              this.notification = "pseudo déjà utilisé";
            }, error: (error) => {
              if (error.status === 404) {
                this.addUser(user)
              }
            }
          });
        }
      },
    });
  }
}
