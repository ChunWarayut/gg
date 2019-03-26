import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public menuPages = [];
  constructor() {}
  ngOnInit(): void {
    this.menuPages = [
      { url: "/home", title: "Home" },
      { url: "/about", title: "About" },
      { url: "/building", title: "Building" },
      { url: "/singlejob", title: "Singlejob" },
      { url: "/contact", title: "Contact" },

    ];
  }
}
