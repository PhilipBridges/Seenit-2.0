import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Subject, throwError, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CommentsService {
  commentUrl = environment.COMMENT_ENDPOINT;
  votedComment = new BehaviorSubject<{}>({});
  newComment = new BehaviorSubject<{}>({});

  newCommentCast = this.newComment.asObservable();
  commentCast = this.votedComment.asObservable();

  constructor(private http: HttpClient) {}

  getComments(postId) {
    return this.http.get<any>(this.commentUrl, {
      params: {
        postId
      }
    });
  }

  createComment(comment, postId) {
    const newComment = {
      text: comment,
      postId
    };
    this.commentCreated(comment);
    return this.http
      .post(this.commentUrl, newComment)
      .pipe(catchError(this.errorHandler));
  }

  upvote(id, author) {
    return this.http.patch<any>(`${this.commentUrl}/${id}`, {
      vote: true,
      author: {
        ...author
      }
    });
  }

  upvotedComment(id) {
    this.votedComment.next(id);
  }

  commentCreated(comment) {
    this.newComment.next(comment);
  }

  getNextPage(skip) {
    return this.http.get<any>(this.commentUrl, { params: { skip } });
  }

  getPrevPage(skip) {
    return this.http.get<any>(this.commentUrl, { params: { skip } });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
