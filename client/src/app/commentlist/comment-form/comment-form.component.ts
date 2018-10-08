import { Component, OnInit } from "@angular/core";
import { CommentsService } from "../../comments.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-comment-form",
  templateUrl: "./comment-form.component.html",
  styleUrls: ["./comment-form.component.scss"]
})
export class CommentFormComponent implements OnInit {
  postId = "";
  commentText = new FormControl("", Validators.required);

  constructor(
    private commentService: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("id");
  }

  createComment() {
    return this.commentService
      .createComment(this.commentText.value, this.postId)
      .subscribe(res => {
        this.commentService.commentCreated(res);
      });
  }
}
