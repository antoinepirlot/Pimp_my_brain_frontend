import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ChatService } from "../../../services/chat.service";
import { UserService } from "src/app/services/user.service";
import { RoomService } from "src/app/services/room.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { Message } from "src/app/models/message";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent implements OnInit {
  notification: string = ""
  m: string = ""
  user_pseudo: string = ""
  user_pseudo_interloc: string = ""
  user_id: number = 0;
  user_id_interloc: number = 0;
  id_room: string = "";

  htmlContent = '';

  roomForm = new FormGroup({
    message: new FormControl("", Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private as: ChatService,
    private roomService: RoomService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.id_room = this.route.snapshot.paramMap.get('id')!;
    this.user_pseudo = this.route.snapshot.paramMap.get('username1')!;
    this.user_pseudo_interloc = this.route.snapshot.paramMap.get('username2')!;
    this.getUsersByToken();
    this.roomService.joinRoom(this.user_pseudo, this.id_room)
    this.receiveStatus()
    this.receiveStatusLeft()
    this.receiveMessage()
  }

  receiveStatus() {
    this.roomService.getStatus()
      .subscribe((data) => {
        this.m = data.msg!
        this.htmlContent += `<p>${this.m}</p>`
      })
  }

  receiveStatusLeft() {
    this.roomService.getStatusLeft()
      .subscribe((data) => {
        this.m = data.msg!
        this.htmlContent += `<p>${this.m}</p>`
      })
  }

  receiveMessage() {
    this.roomService.getMessage()
    .subscribe((data) => {
      this.m = data.msg!
      this.htmlContent += `<p>${this.m}</p>`
    })
  }
  
  getUsersByToken() {
    this.userService
      .getUserByToken(localStorage.getItem("token")!)
      .subscribe((data) => {
        this.user_id = data.id!;
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

  onSubmit(): void {
    let message = this.roomForm.value.message!
    this.roomService.sendMessage(message, this.id_room, this.user_pseudo)
  }

  leaveOnSubmit(): void {
    this.roomService.leaveRoom(this.id_room, this.user_pseudo)
    //this.router.navigateByUrl("/")
  }
}
