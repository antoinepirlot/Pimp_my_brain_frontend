import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";
import { UserService } from "src/app/services/user.service";
import { Notification } from "../../../models/notification";
import { Router} from "@angular/router";

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
    private notifService: NotificationService, private router: Router
  ) {}
  ngOnInit(): void {
    this.getUsersByToken();
  }

  getUsersByToken() {

    
    this.userService
      .getUserByToken()
      .subscribe((data) => {

        this.id_user = data.id_user!;

        this.getNotificationsByUser();
      });
      
  }

  getNotificationsByUser() {
    this.notifService.getNotificationsByUser(this.id_user).subscribe((data) => {

      this.notifs = data;

      data.forEach(notif =>{
        this.notifService.update_notification(notif.id_notification).subscribe((info) =>{

        })
      })

    });
  }

  getDate(date: string) {
    return (this.dateFormat = date.substring(0, 10));
  }
  onClick(link:any){
    this.router.navigateByUrl(link)

  }
}
