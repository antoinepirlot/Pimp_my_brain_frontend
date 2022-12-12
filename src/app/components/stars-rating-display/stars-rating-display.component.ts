import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rating-display',
  templateUrl: 'stars-rating-display.component.html',
  styleUrls: [ 'stars-rating-display.component.css'
  ]
})
export class StarsRatingDisplayComponent {
  @Input() goldenStars!: number
  @Input() greyStars!: number
  constructor(){

  }
}
