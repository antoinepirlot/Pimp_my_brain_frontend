import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
  courses!:Course[];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() : void {
    //TODO use good id
    this.courseService.getAllTeacherCourses(800).subscribe(response => this.courses = response);
  }
}
