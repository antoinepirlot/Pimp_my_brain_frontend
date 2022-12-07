import { Component, OnInit } from "@angular/core";

import { UserService } from "./users/user.service";
import { User } from "./users/user";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    
      <h1>
        <button (click)="getUsers()"></button>
      </h1>
      <div *ngFor="let user of users">
     
      {{ user.lastname }} 
      {{ user.firstname }}
      {{ user.email }} 
      {{ user.pseudo }} 
      {{ user.phone }}

    </div>
    

    <router-outlet></router-outlet>
  `,
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
