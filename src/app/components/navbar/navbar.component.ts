import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";
import {Subscription} from "rxjs";
import { UserService } from "src/app/services/user.service";
import {getToken} from "../../utils/utils";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  connected: boolean = false;
  private subscriptionName: Subscription;
  id_user!: number;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private navbarService: NavbarService,
      private userService: UserService
  ) {
    this.subscriptionName = this.navbarService.getUpdate().subscribe(next => {
      this.connected = next;
    })
    this.navbarService.getProfileId().subscribe({
      next: data => {
        this.id_user = data
      },
      error: _ => {}
    })
  }

  ngOnInit(): void {
    this.getUsersByToken()
    this.connected = this.token()
  }

  token() {
    return localStorage.getItem("token") !== null;
  }

  ngOnDestroy(): void {
    this.subscriptionName.unsubscribe();
  }

  getUsersByToken() {
    this.userService
      .getUserByToken()
      .subscribe({
        next: data => {
          this.id_user = data.id_user!;
        },
        error: err => {
          console.error(err)
        }
      });
  }
}
