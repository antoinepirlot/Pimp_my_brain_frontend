import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../../services/course.service";
import { Course } from "../../../models/course";
import { ActivatedRoute, Router } from "@angular/router";
import { AppointmentComponent } from "../appointment/appointment.component";
import { AppointmentService } from "src/app/services/appointment.service";
import { Appointment } from "src/app/models/appointment";
import { isThisTypeNode } from "typescript";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";

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
  id_connected!: number;
  student: User = {
    email: "",
    lastname: "",
    firstname: "",
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private appointments: AppointmentService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_course = +this.route.snapshot.params["id_course"];
    this.id_student = +this.route.snapshot.params["id_student"];
    
    this.getUserByToken();
    

    this.courseService.getOneCourse(this.id_course).subscribe((response) => {
      this.course = response;
      
      this.getAppointmentBYyCourseByUser();
    });
  }

  getAppointmentBYyCourseByUser() {
    this.appointments
      .getAppointmentBYyCourseByUser(this.id_course, this.id_student)
      .subscribe((data) => {
        

        this.appointment = data;
        this.getUserById();
      });
  }

  selectedStatus = "";
  onSelected(value: string): void {
    this.selectedStatus = value;
    
  }

  getUserByToken() {
    this.userService.getUserByToken().subscribe((data) => {
      
      this.id_connected = data.id_user!;
    });
  }

  update(state: string) {
    this.appointments
      .update_appointment(this.id_course, this.id_student, state)
      .subscribe(() => {
       
        this.ngOnInit();
      });
  }

  getUserById() {
    this.userService
      .getUserById(this.appointment.id_student)
      .subscribe((data) => {
        this.student = data;
      });
  }
}
