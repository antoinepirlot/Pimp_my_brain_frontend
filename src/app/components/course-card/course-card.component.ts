import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Course} from "../../models/course";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input() course!:Course;
  @Output() seeMoreEvent = new EventEmitter<number>();

  onSeeMore(idCourse: number) {
    //console.log(idCourse)
    this.seeMoreEvent.emit(idCourse);
  }
}
