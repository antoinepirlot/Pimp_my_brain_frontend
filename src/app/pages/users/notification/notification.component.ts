import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";
import { UserService } from "src/app/services/user.service";
import { Notification } from "../../../models/notification";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  id_user: number = 0;
  notifs: Notification[] = [];
  dateFormat: string = "";

  constructor(
    private userService: UserService,
    private notifService: NotificationService
  ) {}
  ngOnInit(): void {
    this.getUsersByToken();
  }

  getUsersByToken() {
    console.log(localStorage.getItem("token"));
    
    this.userService
      .getUserByToken()
      .subscribe((data) => {
        console.log("aaaaaaaaaaaaaaaaaaaa",data);
        this.id_user = data.id_user!;
        console.log(this.id_user);
        this.getNotificationsByUser();
      });
      
  }

  getNotificationsByUser() {
    this.notifService.getNotificationsByUser(this.id_user).subscribe((data) => {
      console.log(data);
      this.notifs = data;
    });
  }

  getDate(date: string) {
    return (this.dateFormat = date.substring(0, 10));
  }
}
