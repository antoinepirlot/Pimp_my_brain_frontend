import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { User } from "../../../models/user";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'
  ]
})
export class NotificationComponent implements OnInit {

  id_user: number= 0;
  notifs : Notification[]= [];

  constructor(private userService : UserService, private notifService: NotificationService){}
  ngOnInit(): void {
   this.getUsersByToken()
  }

  getUsersByToken(){
   this.userService.getUserByToken(localStorage.getItem('token')!).subscribe(data=>{
    this.id_user = data.id!
    console.log(this.id_user);
    this.getNotificationsByUser()
   })
  }

  getNotificationsByUser(){
    this.notifService.getNotificationsByUser(this.id_user).subscribe(data =>{
      
      this.notifs=data
      console.log(this.notifs);
      
    })
  }

}
