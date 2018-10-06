import { Component, OnInit } from "@angular/core";
import { PostService } from "../../post.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-seen-view",
  templateUrl: "./seen-view.component.html",
  styleUrls: ["./seen-view.component.scss"]
})
export class SeenViewComponent implements OnInit {
  posts = [];
  seenName = "";
  touched = false;
  skip = 0;
  total = 0;
  nextDisabled = false;
  prevDisabled = false;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.seenName = this.route.snapshot.paramMap.get("name");
    this.postService.getSeenPosts(this.seenName).subscribe(posts => {
      this.posts.push(...posts.data);
      this.total = posts.total;
      this.prevCheck();
      this.nextCheck();
    });
  }

  nextCheck() {
    if (this.posts.length + this.skip === this.total) {
      this.nextDisabled = true;
      this.prevDisabled = false;
    }
    if (this.posts.length <= 4) {
      this.nextDisabled = true;
      this.prevDisabled = false;
    }
  }

  prevCheck() {
    if (this.skip === 0) {
      this.prevDisabled = true;
      this.nextDisabled = false;
    }
  }

  nextPage() {
    this.touched = true;
    this.skip += this.posts.length;
    this.postService.getNextPage(this.skip).subscribe(posts => {
      this.posts = [];
      this.posts.push(...posts.data);
      this.nextCheck();
    });
  }

  prevPage() {
    this.skip -= 5;
    this.postService.getPrevPage(this.skip).subscribe(posts => {
      this.posts = [];
      this.posts.push(...posts.data);
      this.prevCheck();
    });
  }

  lengthCheck(post) {
    if (post.text.length > 25) {
      return false;
    }
    return true;
  }
}
