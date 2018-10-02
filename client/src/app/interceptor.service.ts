import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http/";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req, next) {
    const tokenRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return next.handle(tokenRequest);
  }
}
