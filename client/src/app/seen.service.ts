import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SeenService {
  seenUrl = environment.SEEN_ENDPOINT;
  constructor(private http: HttpClient) {}

  getSeens() {
    return this.http.get<any>(this.seenUrl);
  }

  getSingleSeen(id) {
    return this.http.get<any>(`${this.seenUrl}/${id}`);
  }

  createSeen(seen) {
    const newSeen = {
      name: seen.name.value,
      description: seen.description.value
    };
    return this.http
      .post(this.seenUrl, newSeen)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
