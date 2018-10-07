import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";
import PostInterface from "./post.interface";

@Component({
  selector: "app-post-view",
  templateUrl: "./post-view.component.html",
  styleUrls: ["./post-view.component.scss"]
})
export class PostViewComponent implements OnInit {
  postId = "";
  post: {};
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("id");
    this.postService.getSinglePost(this.postId).subscribe(
      res => {
        this.post = res;
      },
      err => console.log(err)
    );
  }
}
