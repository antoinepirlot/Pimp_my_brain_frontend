import {Component} from '@angular/core';
import api_requests from "../../../utils/api_requests";
@Component({
  selector: 'app-my-courses',
  templateUrl: './my_courses.component.html',
  styleUrls: ['./my_courses.component.css']
})

export class MyCoursesComponent {

  async getAllCourses() {
    const courses = await api_requests.getAllTeacherCourses();
    return courses;
  }
}
