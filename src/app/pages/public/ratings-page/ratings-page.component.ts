import { Component, Input, OnInit } from '@angular/core';
import { Rating } from 'src/app/models/rating';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-ratings-page',
  templateUrl: 'ratings-page.component.html',
  styleUrls: ['ratings-page.component.css'
  ]

}
)
export class RatingsPageComponent implements OnInit {
  @Input() id_teacher?: number; //TODO : put ! instead of ? => id by the path

  allRatings!:Rating[];
  constructor(private ratingsService : RatingsService){
    
  }



  ngOnInit(){
    this.id_teacher = 1 //TODO : delete this line
    this.ratingsService.getAllRatings(this.id_teacher!).subscribe({
      next : (data) => {
        this.allRatings = data
        console.log(this.allRatings)
        console.log(typeof(this.allRatings[0].rating_number))
      }
    }) 
    
  }
}
