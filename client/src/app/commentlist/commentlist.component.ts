import { Component, OnInit } from "@angular/core";
import { CommentsService } from "../comments.service";
import { ActivatedRoute } from "@angular/router";

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
    // Get postId
    this.postId = this.route.snapshot.paramMap.get("id");
    // Get initial comments
    this.commentService.getComments(this.postId).subscribe(res => {
      this.comments.push(...res.data);
    });
    // Update array when user adds a new comments
    this.commentService.newCommentCast.subscribe(res => {
      // @ts-ignore
      if (res.text) {
        this.comments.unshift(res);
      }
    });
    // Update when users upvotes
    this.commentService.commentCast.subscribe(
      async (res: object) => {
        console.log(res);
        // @ts-ignore
        if (res.text) {
          console.log("ya");
          // @ts-ignore
          const commentId = await JSON.parse(JSON.stringify(res._id));
          const index = this.comments.findIndex(
            comment => comment._id === commentId
          );
          this.comments.splice(index, 1, res);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  upvote(id, author) {
    this.commentService.upvote(id, author).subscribe(res => {
      this.commentService.upvotedComment(res);
    });
  }
}
