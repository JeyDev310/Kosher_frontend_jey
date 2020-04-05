import { Component, OnInit } from "@angular/core";
declare var fancyscript: any;

@Component({
  selector: "app-image-fancy",
  templateUrl: "./image-fancy.component.html",
  styleUrls: ["./image-fancy.component.scss"]
})

export class ImageFancyComponent implements OnInit {

  restaurant: any

  constructor() { 

  }

  ngOnInit() {

    fancyscript();
    
    this.restaurant =  JSON.parse(localStorage.getItem('restaurant'));
  }
}
