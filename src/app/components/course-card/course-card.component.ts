import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Course} from "../../models/course";
import { isConnected } from 'src/app/utils/utils';
import { Router } from "@angular/router";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit{
  @Input() course!:Course;
  @Output() seeMoreEvent = new EventEmitter<number>();
  numberFilledStars!:number;
  numberEmtpyStars!:number;
  isConnected!:Boolean;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.isConnected=isConnected();
    //if there are stars for the teacher
    if(this.course.sum_stars!==0){
      this.numberFilledStars=Math.round(this.course.sum_stars!/this.course.total_tuples_stars!);
      this.numberEmtpyStars=5-this.numberFilledStars;
    }
    //if the is no any star for the teacher
    else{
      this.numberEmtpyStars=5;
      this.numberFilledStars=0;
    }
  }

  onSeeMore(idCourse: number) {
    if(this.isConnected)
      this.seeMoreEvent.emit(idCourse);
  }

  onPseudo(idTeacher?: number){
    this.router.navigateByUrl("/profile/"+idTeacher);
  }
}
