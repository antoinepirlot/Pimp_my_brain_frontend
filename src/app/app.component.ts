import { Component, OnInit } from "@angular/core";

import { UserService } from "./users/user.service";
import { User } from "./users/user";

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  users: User[] = [];;
  

  constructor(private userService: UserService) {}


  ngOnInit(): void {
   this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
      
    });
  }
}
