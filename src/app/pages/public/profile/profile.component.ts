import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
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
  constructor(private route: ActivatedRoute, private usersService: UserService) {

  }

  ngOnInit() {
    this.idUser = +this.route.snapshot.params['id_user'];
    this.usersService.getUserById(this.idUser).subscribe({
      next: (data) => {
        this.userProfile = data
        console.log(this.userProfile)
      }
    })
  }

  addRating() {
    console.log("add rating")
    console.log(this.ratingForm!.get("numberRating")!.value!)
    console.log(this.ratingForm.get("descriptionRating")?.value)
    if (this.ratingForm!.get("numberRating")!.value! <= 0 ||
      this.ratingForm!.get("numberRating")!.value! > 5) {
      this.notificationAddRating = "Le nombre d'étoiles entré est incorrecte";
      return;
    }
    if (this.ratingForm!.get("descriptionRating")!.value!.trim().length == 0) {
      this.notificationAddRating = "Vous devez remplir la description de la note";
      return;
    }


    //TODO : add rating

    this.notificationAddRating = ""

  }

}
