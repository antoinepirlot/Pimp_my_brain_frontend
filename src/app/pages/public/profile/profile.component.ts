import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { RatingsService } from 'src/app/services/ratings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {
  idUser!: number;
  userProfile!: User;
  ratingForm = new FormGroup({
    descriptionRating: new FormControl("", Validators.required),
    numberRating: new FormControl(1, Validators.required)
  });
  notificationAddRating: string = "";

  newRating: Rating = {
    rating_text: "",
    rating_number: 1,
    id_rater: 2, //TODO : change id with the person connected
    id_rated: this.idUser
  };

  constructor(private route: ActivatedRoute, private usersService: UserService, private ratingsService: RatingsService) {

  }

  ngOnInit() {
    this.idUser = +this.route.snapshot.params['id_user'];
    this.newRating.id_rated = this.idUser;

    this.usersService.getTeacherById(this.idUser).subscribe({
      next: (data) => {
        this.userProfile = data
        console.log(this.userProfile)
      }
    })
  }

  addRating() {
    if (this.ratingForm!.get("numberRating")!.value! <= 0 ||
      this.ratingForm!.get("numberRating")!.value! > 5) {
      this.notificationAddRating = "Le nombre d'étoiles entré est incorrecte";
      return;
    }
    if (this.ratingForm!.get("descriptionRating")!.value!.trim().length == 0) {
      this.notificationAddRating = "Vous devez remplir la description de la note";
      return;
    }

    this.newRating.rating_text = this.ratingForm!.get("descriptionRating")!.value!.trim()
    this.newRating.rating_number = this.ratingForm!.get("numberRating")!.value!
    console.log(this.newRating)


    //add rating
    this.ratingsService.createOneRating(this.newRating).subscribe({
      next: (data) => {
        this.notificationAddRating = "La note a bien été publiée !"
        this.ratingForm!.get("descriptionRating")!.setValue("");
      },
      error: (error) => {
        if (error.status === 409) {
          this.notificationAddRating = "Vous avez déjà publié un avis pour ce professeur";
        } else if (error.status === 404) {
          this.notificationAddRating = "Le professeur n'est plus présent sur notre site"
        } else if (error.status === 403) {
          this.notificationAddRating = "Il faut avoir fini un cours avec un professeur pour lui mettre un avis"
        } else {
          console.warn("Server error");
        }
      }
    });





  }

}
