import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { RatingsService } from 'src/app/services/ratings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ratings-page',
  templateUrl: 'ratings-page.component.html',
  styleUrls: ['ratings-page.component.css'
  ]

}
)
export class RatingsPageComponent implements OnInit {
  @Input() id_teacher?: number; //TODO : put ! instead of ? => id by the path
  teacher?:User;
  allRatings!:Rating[];
  constructor(private ratingsService : RatingsService, private usersService : UserService, private route: ActivatedRoute){
    
  }

  ngOnInit(){
    this.id_teacher = +this.route.snapshot.params['id_teacher'] //TODO : delete this line
    console.log(this.id_teacher)
    console.log(typeof(this.teacher))
    this.ratingsService.getAllRatings(this.id_teacher!).subscribe({
      next : (data) => {
        this.allRatings = data
        console.log(this.allRatings)
      }
    }) 
    this.usersService.getUserById(this.id_teacher!).subscribe({
      next : (data) => {
        this.teacher = data
      }
    })
    
  }
}
