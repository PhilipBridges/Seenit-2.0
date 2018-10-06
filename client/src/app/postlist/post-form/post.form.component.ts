import { Component, OnInit } from "@angular/core";
import { PostService } from "../../post.service";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-form",
  templateUrl: "./post.form.component.html",
  styleUrls: ["./post.form.component.scss"]
})
export class PostFormComponent implements OnInit {
  postData = {
    postTitle: new FormControl("", Validators.required),
    postText: new FormControl("", Validators.required),
    seenName: ""
  };
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postData.seenName = this.route.snapshot.paramMap.get("name");
  }

  post() {
    this.postService
      .createPost(this.postData)
      .subscribe(res => console.log(res));
  }
}
