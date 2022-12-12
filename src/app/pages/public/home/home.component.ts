import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses!:Course[][];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() : void {
    this.courses = new Array<Array<Course>>();
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        if(data.length===0) return;

        let numberOfColumns = 4;
        //Separate the courses in lists of 3 courses
        for(let i = 0; i< data.length ; i=i+numberOfColumns){
          let dataSeparatedInBloc:Course[]  = new Array<Course>();  
          let end = i+numberOfColumns;
          for(let j = i; j< data.length && j<end ; j++){
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
    });
  }
}
