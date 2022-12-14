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
  my_username: string = ""
  username_interloc: string = "";

  chatForm = new FormGroup({
    id: new FormControl(0, Validators.required)
  });

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
      .getUserByToken()
      .subscribe((data) => {
        console.log(data)
        this.user_id = data.id_user!;
        //this.my_username = data.pseudo!
        console.log(this.user_id);
        this.getUserById(this.user_id)
      });   
  }

  getUserById(id: number) {
    let username = ""
    this.userService
      .getUserById(id)
      .subscribe((data) => {
        console.log(data.pseudo)
        this.my_username = data.pseudo!
        username = data.pseudo!
      })
    return username
  }

  onSubmit(): void {
    console.log(this.user_id)
    console.log(this.my_username)
    let id_interloc = this.chatForm.value.id!;
    //let ps_interloc = ""
    this.as.login(this.user_id, id_interloc)
    //ps_interloc = this.getUserById(id_interloc)
    //console.log(ps_interloc)
    this.as.getRoomId().subscribe( {
      next: (data) => {
        this.router.navigateByUrl(`/room/${data.room_id}/${id_interloc}/${this.my_username}`);
      }
    })
  }
}
