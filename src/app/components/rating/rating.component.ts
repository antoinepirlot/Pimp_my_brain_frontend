import { Component, Input } from '@angular/core';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: [ 'rating.component.css'
  ]
})
export class RatingComponent {
  @Input() rating!:Rating;

  constructor(){
    console.log(this.rating)
  }
}
