import { Component } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppointmentService } from "src/app/services/appointment.service";
import { Appointment } from "src/app/models/appointment";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment-create.component.html",
  styleUrls: ["./appointment-create.component.css"],
})
export class AppointmentCreateComponent {
  notification: string  = ""
  bool: boolean = false
  id_course: number = 0
  id_student: number = 0

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.id_student = Number(this.route.snapshot.paramMap.get('id_student'))!;
    this.id_course = Number(this.route.snapshot.paramMap.get('id_course'))!;
  }

  appointmentForm = new FormGroup({
    date: new FormControl("", Validators.required),
    rue: new FormControl("", Validators.required),
    boite: new FormControl("", Validators.required),
    numero: new FormControl("", Validators.required),
  });

  onSubmit() {
    let date = this.appointmentForm.value.date
    let rue = this.appointmentForm.value.rue
    let boite = this.appointmentForm.value.boite
    let numero = this.appointmentForm.value.numero
    
    if(date === "" || rue === "" || numero === "") {
      this.notification = "Veuillez entrer tout les champs"
      return
    } 
    
    if(boite === "") {
      let appointment: Appointment = {
        id_course: this.id_course,
        id_student: this.id_student,
        appointment_date: date!,
        street: rue!,
        number_house: Number(numero)
      }
      this.appointmentService.createAppointment(appointment).subscribe({
        //if ok
        next: () => {
          setTimeout(() => this.router.navigateByUrl("/"), 2000);
        }
      });
    } else {
      let appointment: Appointment = {
        id_course: this.id_course,
        id_student: this.id_student,
        appointment_date: date!,
        street: rue!,
        number_house: Number(numero),
        box_house: boite!
      }
      this.appointmentService.createAppointment(appointment).subscribe({
        //if ok
        next: () => {
          setTimeout(() => this.router.navigateByUrl("/"), 2000);
        }
        
      });
      this.notification = "L'invitation à bien été envoyé";
    }
    
  }
}
