import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "src/app/services/appointment.service";
import { UserService } from "src/app/services/user.service";
import { CourseService } from "../../../services/course.service";
import { Appointment } from "../../../models/appointment";
import { Course } from "src/app/models/course";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"],
})
export class AppointmentComponent implements OnInit {
  id_user: number = 0;
  appointments: Appointment[] = [];
  courses: Course[] = [];
 
  course: Course = {course_description:"",level: ""};

  constructor(
    private appointmentsService: AppointmentService,
    private userService: UserService,
    private courseService: CourseService,private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsersByToken();
  }

  getUsersByToken() {
    this.userService
      .getUserByToken()
      .subscribe((data) => {
        this.id_user = data.id_user!;
        console.log(this.id_user);
        this.getAppointmentsByUser();
      });
  }

  getAppointmentsByUser() {
    this.appointmentsService
      .getAppointmentsByUser(this.id_user)
      .subscribe({
        next: data => {
          this.appointments = data;
          this.getcourses()
        },
        error: err => {
          if(err.status === 404) {
            this.appointments = []
          }
        }
      });
  }

  getcourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      console.log("2",this.courses);
      
    });
  }

  courseToShow(id_course: number) {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id_course == id_course) {
        return this.courses[i];
      }
    }
    return this.course;
  }

  onClick(id_course: number){
    
    this.router.navigateByUrl('/rendezvous/'+id_course)
    
  }
}
