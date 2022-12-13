import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Course} from "../../models/course";

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

  ngOnInit(): void {
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
    this.seeMoreEvent.emit(idCourse);
  }
}
