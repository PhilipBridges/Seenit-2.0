import { Component, OnInit } from "@angular/core";
import { MessageService } from "../message.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  messages = [];
  messageData = {
    text: "",
    targetName: ""
  };
  confirm = false;
  $selectedUser = "";
  // Pagination stuff
  touched = false;
  skip = 0;
  total = 0;
  nextDisabled = false;
  prevDisabled = false;
  // Errors
  errors: "";

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages().subscribe(messages => {
      this.messages.push(...messages.data);
      this.total = messages.total;
      this.prevCheck();
      this.nextCheck();
    });
  }

  post() {
    this.messageService.postMessage(this.messageData).subscribe(
      async res => {
        this.errors = "";
        this.messageData.text = "";
        this.messageData.targetName = "";
        this.messageConfirm();
      },
      err => (this.errors = err.error.message)
    );
  }

  nextCheck() {
    if (this.messages.length + this.skip === this.total) {
      this.nextDisabled = true;
      this.prevDisabled = false;
    }
    if (this.messages.length <= 4) {
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
    this.skip += this.messages.length;
    this.messageService.getNextPage(this.skip).subscribe(messages => {
      this.messages = [];
      this.messages.push(...messages.data);
      this.nextCheck();
    });
  }

  prevPage() {
    this.skip -= 5;
    this.messageService.getPrevPage(this.skip).subscribe(messages => {
      this.messages = [];
      this.messages.push(...messages.data);
      this.prevCheck();
    });
  }

  clickReply(message) {
    this.messageData.targetName = message.author.name;
  }

  messageConfirm() {
    this.confirm = true;
    setTimeout(() => {
      this.confirm = false;
    }, 1500);
  }
}
