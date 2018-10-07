import { Component, OnInit } from "@angular/core";
import { SeenService } from "../seen.service";

@Component({
  selector: "app-seen-list",
  templateUrl: "./seen-list.component.html",
  styleUrls: ["./seen-list.component.scss"]
})
export class SeenListComponent implements OnInit {
  seens = [];
  touched = false;
  skip = 0;
  total = 0;
  nextDisabled = false;
  prevDisabled = false;
  loading = true;
  constructor(private seenService: SeenService) {}

  ngOnInit() {
    this.seenService.getSeens().subscribe(res => {
      this.seens.push(...res.data);
      this.total = res.total;
      this.nextCheck();
      this.prevDisabled = true;
      this.loading = false;
    });
  }

  nextCheck() {
    if (this.seens.length + this.skip === this.total) {
      this.nextDisabled = true;
      this.prevDisabled = false;
    }
    if (this.seens.length <= 4) {
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
    this.skip += this.seens.length;
    this.seenService.getNextPage(this.skip).subscribe(seens => {
      this.seens = [];
      this.seens.push(...seens.data);
      this.nextCheck();
    });
  }

  prevPage() {
    this.skip -= 10;
    this.seenService.getPrevPage(this.skip).subscribe(seens => {
      this.seens = [];
      this.seens.push(...seens.data);
      this.prevCheck();
    });
  }
}
