import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-review-slider",
  templateUrl: "./review-slider.component.html",
  styleUrls: ["./review-slider.component.scss"]
})

export class ReviewSliderComponent implements OnInit {
  
  restaurant: any;
  flag: false
  constructor() { 

  }

  ngOnInit() {
    this.restaurant =  JSON.parse(localStorage.getItem('restaurant'));
  }
}
