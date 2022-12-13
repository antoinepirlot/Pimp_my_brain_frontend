import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses!:Course[][];
  allOptions:string[] = ["PHP","Java","Jardinage"]
  searchForm = new FormGroup({
    optionChosen: new FormControl(this.allOptions[0]),
    city: new FormControl(""),
    description: new FormControl("")
  });
  

  constructor(private courseService: CourseService, private router: Router,) {
  }

  onCardClick(idCourse: number) {
    this.router.navigateByUrl("course_details/"+idCourse);
  }

  ngOnInit() : void {
    this.courses = new Array<Array<Course>>();
    this.courseService.getCourses().subscribe({
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

  onSubmitSearch() {
    //let search = this.searchForm.value.search!
    console.log("ok")
  }
}
