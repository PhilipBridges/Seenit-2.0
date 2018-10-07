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
  upvotedPost = {};
  loading = true;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.seenName = this.route.snapshot.paramMap.get("name");
    this.postService
      .getSeenPosts(this.seenName)
      .subscribe((posts: Array<object>) => {
        // @ts-ignore
        this.posts.push(...posts.data);
        // @ts-ignore
        this.total = posts.total;
        this.nextCheck();
        this.prevDisabled = true;
        this.loading = false;
      });
    this.postService.postCast.subscribe(async (res: object) => {
      // @ts-ignore
      if (res.text) {
        // @ts-ignore
        const postId = await JSON.parse(JSON.stringify(res._id));
        const index = this.posts.findIndex(post => post._id === postId);
        this.posts.splice(index, 1, res);
      }
    });
  }

  upvote(id, author) {
    this.postService.upvote(id, author).subscribe(
      async res => {
        this.postService.upvotedPost(res);
      },
      err => console.log(err)
    );
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
