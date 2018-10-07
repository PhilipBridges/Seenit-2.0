import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Subject, throwError, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private posts = new Subject<any>();
  postUrl = environment.POST_ENDPOINT;
  votedPost = new BehaviorSubject<{}>({});

  postCast = this.votedPost.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(this.postUrl);
  }

  getSinglePost(id) {
    return this.http.get<any>(`${this.postUrl}/${id}`);
  }

  getSeenPosts(seenName) {
    return this.http.get<any>(this.postUrl, { params: { seenName } });
  }

  createPost(post) {
    const newPost = {
      title: post.postTitle.value,
      text: post.postText.value,
      seenName: post.seenName
    };
    return this.http
      .post(this.postUrl, newPost)
      .pipe(catchError(this.errorHandler));
  }

  upvote(id, author) {
    console.log("PASSED AUTHOR", author);
    return this.http.patch<any>(`${this.postUrl}/${id}`, {
      vote: true,
      author: {
        ...author
      }
    });
  }

  upvotedPost(id) {
    this.votedPost.next(id);
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
