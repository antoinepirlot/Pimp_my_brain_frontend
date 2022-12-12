import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";
import {Subscription} from "rxjs";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  connected: boolean = false;
  private subscriptionName: Subscription;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private navbarService: NavbarService
  ) {
    this.subscriptionName = this.navbarService.getUpdate().subscribe(next => {
      this.connected = next;
    })
  }

  ngOnInit(): void {
    this.connected = this.token()
  }

  token() {
    return localStorage.getItem("token") !== null;
  }

  ngOnDestroy(): void {
    this.subscriptionName.unsubscribe();
  }
}
