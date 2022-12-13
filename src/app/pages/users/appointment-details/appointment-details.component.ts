import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../../services/course.service";
import { Course } from "../../../models/course";
import { ActivatedRoute, Router } from "@angular/router";
import { AppointmentComponent } from "../appointment/appointment.component";
import { AppointmentService } from "src/app/services/appointment.service";
import { Appointment } from "src/app/models/appointment";
import { isThisTypeNode } from "typescript";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-appointment-details",
  templateUrl: "./appointment-details.component.html",
  styleUrls: ["./appointment-details.component.css"],
})
export class AppointmentDetailsComponent implements OnInit {
  id_course!: number;
  id_student!: number;
  course!: Course;
  appointment!: Appointment;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private appointments: AppointmentService,
    private userService: UserService,private router: Router
  ) {}

  ngOnInit(): void {
    this.id_course = +this.route.snapshot.params["id_course"];
    console.log(this.id_course);

    this.courseService.getOneCourse(this.id_course).subscribe((response) => {
      this.course = response;
      console.log("course", response);
      this.getUsersByToken();
    });
  }

  getUsersByToken() {
    this.userService
      .getUserByToken()
      .subscribe((data) => {
        this.id_student = data.id_user!;
        console.log(this.id_student);
        this.getAppointmentBYyCourseByUser();
      });
  }

  getAppointmentBYyCourseByUser() {
    this.appointments
      .getAppointmentBYyCourseByUser(this.id_course, this.id_student)
      .subscribe((data) => {
        console.log("appointment", data);

        this.appointment = data;
      });
  }

  selectedStatus = "";
  onSelected(value: string): void {
    this.selectedStatus = value;
    console.log(this.selectedStatus);
  }

  update(state:string) {
    this.appointments.update_appointment(this.id_course, this.id_student, state).subscribe(()=>{
      console.log("update with state", state);
      this.ngOnInit()
      
    })
  
  }
}
