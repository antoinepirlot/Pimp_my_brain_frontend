import { Component, OnInit } from "@angular/core";
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
  dateFormat: string = "";

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService
  ) {}
  
  ngOnInit(): void {
    this.getUsersByToken();
  }

  getUsersByToken() {
    this.userService
      .getUserByToken(localStorage.getItem("token")!)
      .subscribe((data) => {
        this.id_user = data.id!;
        console.log(this.id_user);
        this.getFavoritesByUser();
      });
  }

  getFavoritesByUser() {
    this.favoriteService.getFavoritesByUser(this.id_user).subscribe((data) => {
      console.log(data);
      this.favorites = data;
    });
  }

}
