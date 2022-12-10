import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from "../../../models/user";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'
  ]
})
export class NotificationComponent implements OnInit {

  user_id: number= 0;

  constructor(private userService : UserService){}
  ngOnInit(): void {
   this.getUsersByToken()
  }

  getUsersByToken(){
   this.userService.getUserByToken(localStorage.getItem('token')!).subscribe(data=>{
    this.user_id = data.id!
   })
  }

}
