import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import {Router} from "@angular/router";
import {createTableOfCourses} from "../../../utils/utils";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
  courses?:Course[][];

  constructor(private courseService: CourseService, private router: Router) {
  }

  ngOnInit() : void {
    this.courses = new Array<Array<Course>>();
    this.courseService.getAllTeacherCourses().subscribe({
      next: (data) => {
        this.courses = createTableOfCourses(data)
      },
      error: (error) => {
        if (error.status === 404) {
          this.courses = undefined;
        } else {
          console.warn("Server error");
        }
      },
    })
  }

  onCardClick(idCourse: number) {
    this.router.navigateByUrl("course_details/"+idCourse);
  }
}
