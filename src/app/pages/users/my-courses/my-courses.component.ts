import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {
  courses!:Course[][];

  constructor(private courseService: CourseService, private router: Router) {
  }

  ngOnInit() : void {
    this.courses = new Array<Array<Course>>();
    this.courseService.getAllTeacherCourses().subscribe({
      next: (data) => {
        if(data.length===0) return;



        let numberOfColumns = 4;
        //Separate the courses in lists of 3 courses
        for(let i = 0; i< data.length ; i=i+numberOfColumns){
          let dataSeparatedInBloc:Course[]  = new Array<Course>();
          let end = i+numberOfColumns;
          for(let j = i; j< data.length && j<end ; j++){
            if(data[j].course_description.length>113){
              data[j].course_description=data[j].course_description.substring(0,113) + "...";
            }
            dataSeparatedInBloc.push(data[j]);
          }
          this.courses.push(dataSeparatedInBloc);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          console.log("Il n'y a pas de offres");
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
