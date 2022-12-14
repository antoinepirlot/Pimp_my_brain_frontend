import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FavoriteService } from "src/app/services/favorite.service";
import { UserService } from "src/app/services/user.service";
import { Favorite } from "../../../models/favorite";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"],
})
export class FavoriteComponent implements OnInit {
  id_user: number = 0;
  favorites: Favorite[] = [];
  favorites_pseudo: Favorite[] = []
  dateFormat: string = "";

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,private router: Router
  ) {}
  
  ngOnInit(): void {
    this.getUsersByToken();
  }

  // get le pseudo de chaque profs et les afficher

  

  getUsersByToken() {
    this.userService
      .getUserByToken()
      .subscribe((data) => {
        this.id_user = data.id_user!;

        this.getFavoritesByUser();
      });
  }

  getFavoritesByUser() {
    this.favoriteService.getFavoritesByUser(this.id_user).subscribe({
      next: (data) =>{

      this.favorites = data;
      } 
    });
  }

  getNameOfFavTeachers(t: Favorite[]) {
    let tName: Favorite[] = []
      
  }
  onPseudo(idTeacher?: number){
    this.router.navigateByUrl("/profile/"+idTeacher);
  }
  
}
