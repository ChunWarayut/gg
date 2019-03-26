import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
@Component({
  selector: 'app-singlejob',
  templateUrl: './singlejob.component.html',
  styleUrls: ['./singlejob.component.scss']
})
export class SinglejobComponent implements OnInit {
  public all: any = null;

  constructor(public http: HttpClient) {
      this.http
        .get("get/gasam.php")
        .subscribe((data: any) => {
          this.all = data;
        });
  }

  ngOnInit() {
  }

}
