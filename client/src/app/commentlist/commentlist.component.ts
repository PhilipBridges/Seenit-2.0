import { Component, OnInit } from "@angular/core";
import { CommentsService } from "../comments.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-commentlist",
  templateUrl: "./commentlist.component.html",
  styleUrls: ["./commentlist.component.scss"]
})
export class CommentlistComponent implements OnInit {
  comments = [];
  postId = "";
  constructor(
    private commentService: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("id");
    this.commentService.getComments(this.postId).subscribe(res => {
      this.comments.push(...res.data);
    });
    this.commentService.newCommentCast.subscribe(res => {
      // @ts-ignore
      if (res.text) {
        this.comments.unshift(res);
      }
    });
    this.commentService.commentCast.subscribe(
      res => {
        console.log("C CAST", res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
