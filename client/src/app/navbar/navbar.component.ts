import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  subscription: Subscription;
  user = {};
  test = "";
  authed = false;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.authCast.subscribe(bool => (this.authed = bool));
    this.authService.userCast.subscribe(user => (this.user = user));
  }

  logout() {
    localStorage.removeItem("token");
    this.authService.authed.next(false);
    this.authService.currentUser.next({});
    this.router.navigate(["/login"]);
  }
}
