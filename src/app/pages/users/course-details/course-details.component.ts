import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  similarCourses!: Course[]
  id_course!: number;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id_course = +this.route.snapshot.params['id_course'];
    this.courseService.getOneCourse(this.id_course).subscribe(response => this.course = response);
  }
}
