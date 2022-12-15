import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../../services/course.service";
import { Course } from "../../../models/course";
import { Notification } from "../../../models/notification";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

import { Category } from "../../../models/category";
import { ChatService } from "src/app/services/chat.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.css"],
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  similarCourses!: Course[];
  id_course!: number;
  user_id!: number;
  pseudo_id!: string;

  numberOfStars!: number;

  notif: Notification = {
    id_notification: 1,
    id_user: 1,
    chat_link: "",
    notification_date: "",
    notification_text: "",
    seen: false,
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private userService: UserService,
    private as: ChatService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id_course = +this.route.snapshot.params["id_course"];
    this.courseService.getOneCourse(this.id_course).subscribe({
      next: (data) => {
        this.course = data;
        if (!data || !data.sum_stars) {
          this.numberOfStars = 0;
        } else {
          this.numberOfStars = Math.round(
            data.sum_stars! / data.total_tuples_stars!
          );
        }
      },
    });
    this.getUsersByToken();
  }

  getUsersByToken() {
    this.userService.getUserByToken().subscribe((data) => {
      console.log(data);
      this.user_id = data.id_user!;
      this.pseudo_id = data.pseudo!;
    });
  }

  onClick() {
    this.as.login(this.user_id, this.course.teacher?.id_user!);
    this.as.getRoomId().subscribe({
      next: (data) => {
        this.notif.chat_link = `/room/${data.room_id}/${this.user_id}/${this.course.teacher?.pseudo}/${this.course.id_course}`;
        this.notif.id_user = this.course.teacher?.id_user!;
        this.notif.notification_text =
          this.pseudo_id + " veux chatter avec vous.";
        console.log(this.notif.chat_link);
        console.log(this.notif);
        
        this.addNotifications(this.notif);

        this.router.navigateByUrl(
          `/room/${data.room_id}/${this.course.teacher?.id_user}/${this.pseudo_id}/${this.course.id_course}`
        );
      },
    });
  }

  addNotifications(notif: Notification) {
    this.notifService.createNotification(notif).subscribe((data)=> {
      console.log("dans la methode mon gars", data);
      
    })
  }
}
