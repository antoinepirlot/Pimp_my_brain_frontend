import { Component, Input } from '@angular/core';
import { UserService } from "../users/user.service";
import { User } from "../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  

  constructor(private userService: UserService){}

  addUser(login: User): void{

    console.log(login);
    this.userService.addUser(login).subscribe(newuser=>{
      console.log(newuser);
    })
  }
}
