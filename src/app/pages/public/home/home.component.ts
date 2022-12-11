import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses!:Course[];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() : void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        if (error.status === 404) {
          console.log("Il n'y a pas de offres");
        } else {
          console.warn("Server error");
        }
      },
    });
  }
}
