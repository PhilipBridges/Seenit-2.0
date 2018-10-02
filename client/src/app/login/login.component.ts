import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
const decode = require("jwt-decode");

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginData = { email: "", password: "", strategy: "local" };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  loginUser() {
    this.authService.loginUser(this.loginData).subscribe(
      async res => {
        localStorage.setItem("token", res.accessToken);
        const data = await decode(res.accessToken);
        this.authService.authCheck(true);
        this.authService.userOb(data.user);
        this.router.navigate(["/home"]);
      },
      err => console.log(err)
    );
  }
}
