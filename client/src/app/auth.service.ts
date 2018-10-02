import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "./../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // registerUrl = environment.REGISTER_ENDPOINT;
  registerUrl = environment.REGISTER_ENDPOINT;
  loginUrl = environment.LOGIN_ENDPOINT;

  currentUser = new BehaviorSubject<{}>({});
  authed = new BehaviorSubject<boolean>(false);

  authCast = this.authed.asObservable();
  userCast = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  register(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  authCheck(boolean) {
    this.authed.next(boolean);
  }

  userOb(user) {
    this.currentUser.next(user);
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }
}
