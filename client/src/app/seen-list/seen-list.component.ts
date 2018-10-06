import { Component, OnInit } from "@angular/core";
import { SeenService } from "../seen.service";

@Component({
  selector: "app-seen-list",
  templateUrl: "./seen-list.component.html",
  styleUrls: ["./seen-list.component.scss"]
})
export class SeenListComponent implements OnInit {
  seens = [];
  constructor(private seenService: SeenService) {}

  ngOnInit() {
  }
}
