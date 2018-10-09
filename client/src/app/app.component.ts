import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
const decode = require("jwt-decode");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  authed = false;
  user = {};
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authCast.subscribe(bool => (this.authed = bool));
    this.authService.userCast.subscribe(user => (this.user = user));

    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedJwt = decode(jwt);
      if (Date.now() / 1000 > decodedJwt.exp) {
        localStorage.removeItem("token");
        this.authService.authCheck(false);
        this.authService.userOb({});
      } else {
        this.authService.authCheck(true);
        this.authService.userOb(decodedJwt.user);
      }
    }
  }
}
