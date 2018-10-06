import { Component, OnInit } from "@angular/core";
import { PostService } from "../../post.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-post-form",
  templateUrl: "./post.form.component.html",
  styleUrls: ["./post.form.component.scss"]
})
export class PostFormComponent implements OnInit {
  postData = {
    postTitle: new FormControl("", Validators.required),
    postText: new FormControl("", Validators.required)
  };
  constructor(private postService: PostService) {}

  ngOnInit() {}

  post() {
    this.postService
      .createPost(this.postData)
      .subscribe(res => console.log(res));
  }
}
