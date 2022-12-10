import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../models/course/course.service";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
  courses:any;

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseService.getAllTeacherCourses(1).subscribe(response => this.courses = response);
  }
}
