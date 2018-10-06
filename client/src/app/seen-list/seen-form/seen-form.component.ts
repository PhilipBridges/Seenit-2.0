import { Component, OnInit } from "@angular/core";
import { SeenService } from "../../seen.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-seen-form",
  templateUrl: "./seen-form.component.html",
  styleUrls: ["./seen-form.component.scss"]
})
export class SeenFormComponent implements OnInit {
  seenData = {
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  };
  constructor(private seenService: SeenService) {}

  ngOnInit() {}

  post() {
    this.seenService
      .createSeen(this.seenData)
      .subscribe(res => console.log(res));
  }
}
