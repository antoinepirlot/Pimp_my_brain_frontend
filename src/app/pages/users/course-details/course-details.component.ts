import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  similarCourses!: Course[]

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService.getOneCourse(1).subscribe(response => this.course = response);
  }


}
