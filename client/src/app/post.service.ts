import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private posts = new Subject<any>();
  postUrl = environment.POST_ENDPOINT;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(this.postUrl);
  }

  getSinglePost(id) {
    return this.http.get<any>(`${this.postUrl}/${id}`);
  }

  createPost(post) {
    const newPost = {
      title: post.postTitle.value,
      text: post.postText.value
    };
    return this.http
      .post(this.postUrl, newPost)
      .pipe(catchError(this.errorHandler));
  }

  getNextPage(skip) {
    return this.http.get<any>(this.postUrl, { params: { skip } });
  }

  getPrevPage(skip) {
    return this.http.get<any>(this.postUrl, { params: { skip } });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
