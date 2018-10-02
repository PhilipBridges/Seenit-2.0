import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "./../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private messages = new Subject<any>();
  messageUrl = environment.MESSAGE_ENDPOINT;

  messageCast = this.messages.asObservable();

  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http.get<any>(this.messageUrl);
  }

  getNextPage(skip) {
    return this.http.get<any>(this.messageUrl, {
      params: { skip }
    });
  }

  getPrevPage(skip) {
    return this.http.get<any>(this.messageUrl, {
      params: { skip }
    });
  }

  postMessage(message) {
    return this.http
      .post<any>(this.messageUrl, message)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
