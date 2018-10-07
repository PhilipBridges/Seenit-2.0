import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";

@Component({
  selector: "app-postlist",
  templateUrl: "./postlist.component.html",
  styleUrls: ["./postlist.component.scss"]
})
export class PostlistComponent implements OnInit {
  posts = [];
  touched = false;
  skip = 0;
  total = 0;
  nextDisabled = false;
  prevDisabled = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts.push(...posts.data);
      this.total = posts.total;
      this.prevCheck();
      this.nextCheck();
    });
  }

  upvote(id, author) {
    this.postService
      .upvote(id, author)
      .subscribe(res => console.log('UPVOTE RESPONSE', res), err => console.log(err));
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
