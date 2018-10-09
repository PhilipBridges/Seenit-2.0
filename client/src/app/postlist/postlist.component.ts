import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { AuthService } from "../auth.service";

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
  loading = true;
  authed = false;
  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts.push(...posts.data);
      this.total = posts.total;
      this.prevCheck();
      this.nextCheck();
      this.loading = false;
    });
    this.auth.authCast.subscribe((res: boolean) => (this.authed = res));
  }

  upvote(id, author) {
    this.postService
      .upvote(id, author)
      .subscribe(res => console.log(res), err => console.log(err));
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
    this.skip -= 10;
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
