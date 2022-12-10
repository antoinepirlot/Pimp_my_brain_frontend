import { Component, Input } from "@angular/core";
import { UserService } from "../users/user.service";
import { User } from "../users/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  notification = "";

  user: User = {
    lastname: "",
    firstname: "",
    email: "",
    pseudo: "",
    sexe: "",
    phone: "",
    password: "",
  };

  constructor(private userService: UserService) {}

  onSubmit(login: any) {
    this.notification = "";

    if (login.value.password != login.value.confirmPassword) {
      this.notification = "Verifiez votre mot de passe";
      return;
    }

    console.log(login.value);

    this.user.email = login.value.email;

    console.log(this.user);

    this.addUser(this.user)
  }

  addUser(user: User): void {
    console.log(user);

    this.userService.addUser(user).subscribe((newuser) => {
      console.log(newuser);
    });
  }
}
