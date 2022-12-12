import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ChatService } from "../../../services/chat.service";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent implements OnInit {
  notification: string = ""
  user_id: number = 0;
  id_room: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private as: ChatService,
  ) {}

  ngOnInit(): void {
    this.id_room = this.route.snapshot.paramMap.get('id')!;
    this.getUsersByToken();
  }
  
  getUsersByToken() {
    this.userService
      .getUserByToken(localStorage.getItem("token")!)
      .subscribe((data) => {
        this.user_id = data.id!;
        console.log(this.user_id);
        //this.getUsersById()
      });   
  }

  getUrl() {
    
  }

}
