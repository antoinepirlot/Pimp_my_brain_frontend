import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import { ActivatedRoute } from '@angular/router';
import {Category} from "../../../models/category";
import {getIdUserConnected} from "../../../utils/utils";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  similarCourses!: Course[]
  id_course!: number;
  numberOfStars!: number;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id_course = +this.route.snapshot.params['id_course'];
    this.courseService.getOneCourse(this.id_course).subscribe({
      next: data => {
        this.course = data
        if (!data || !data.sum_stars) {
          this.numberOfStars = 0
        } else {
          this.numberOfStars = Math.round(data.sum_stars! / data.total_tuples_stars!);
        }
      }
    });
  }

  isMyCourse() {
    return this.course.teacher?.id_user === getIdUserConnected();
  }
}
