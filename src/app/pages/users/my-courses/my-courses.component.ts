import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
  courses:any;

  constructor(private courseService: CourseService) {
  }

  ngOnInit() : void {
    this.courseService.getAllTeacherCourses(1).subscribe(response => this.courses = response);
  }
}
