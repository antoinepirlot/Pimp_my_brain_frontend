import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ChatService } from "../../../services/chat.service";
import { UserService } from "src/app/services/user.service";
import { RoomService } from "src/app/services/room.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent implements OnInit {
  notification: string = ""
  user_pseudo: string = ""
  user_pseudo_interloc: string = ""
  user_id: number = 0;
  user_id_interloc: number = 0;
  id_room: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private as: ChatService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.id_room = this.route.snapshot.paramMap.get('id')!;
    this.user_pseudo = this.route.snapshot.paramMap.get('username1')!;
    this.user_pseudo_interloc = this.route.snapshot.paramMap.get('username2')!;
    this.getUsersByToken();
    this.roomService.joinRoom(this.user_pseudo, this.id_room)
    this.receiveStatus()
  }

  receiveStatus() {
    this.roomService.getStatus()
  }
  
  getUsersByToken() {
    this.userService
      .getUserByToken(localStorage.getItem("token")!)
      .subscribe((data) => {
        this.user_id = data.id!;
        console.log(this.user_id);
        console.log("ici c l'id room ", this.id_room)
        this.getRoomInformation(this.id_room) 
      });  
  }

  getRoomInformation(id_room: string) {
    this.roomService
    .getChatRoomById(id_room)
    .subscribe((data) => {
      if(this.user_id == data.id_user1)
        this.user_id_interloc = data.id_user2
      else
        this.user_id_interloc = data.id_user1
    })
  }

}
