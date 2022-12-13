import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {FavoriteService} from "../../../services/favorite.service";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {
  idUser!:number;
  userProfile!:User;

  isLiked!: boolean;
  ratingForm = new FormGroup({
    descriptionRating: new FormControl("", Validators.required),
  });
  constructor(private route: ActivatedRoute, private usersService : UserService, private favoriteService: FavoriteService){
  }

  ngOnInit(){
    this.idUser = +this.route.snapshot.params['id_user'];
    this.usersService.getUserById(this.idUser).subscribe({
      next : (data) => {
        this.userProfile = data
        console.log(this.userProfile)
      }
    })
    this.favoriteService.getUserProfileLike(this.idUser).subscribe({
      next: data => {
        this.isLiked = true;
      },
      error: err => {
        this.isLiked = false
    }
    });
  }

  onSubmit() {}

  getFavoriteOfConnectedUserForATeacher() {
  }

}
