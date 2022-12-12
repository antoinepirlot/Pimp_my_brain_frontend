import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../../../services/chat.service";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  notification: string = ""
  user_id: number = 0;

  user: User = {
    email: "",
    password: ""
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private as: ChatService,
  ) {}

  ngOnInit(): void {
    this.getUsersByToken();
  }
  
  getUsersByToken() {
    this.userService
      .getUserByToken(localStorage.getItem("token")!)
      .subscribe((data) => {
        this.user_id = data.id!;
        console.log(this.user);
      });
  }

  getUsersById() {
    this.userService
      .getUserByToken(localStorage.getItem("token")!)
      .subscribe((data) => {
        this.user_id = data.id!;
        console.log(this.user);
      });
  }

  onSubmit(): void {
    this.as.login(this.user)
    //this.router.navigateByUrl('/room');
  }
}
