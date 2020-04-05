import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { AppService } from 'app/service/app.service';
import { MapService } from 'app/service/map.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// declare var aboutscript: any;
// declare var fancyscript: any;



@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"]
})

export class RestaurantsComponent implements OnInit {

  currentRestaurant: any;
  restaurant: any;
  lat: number;
  lng: number;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _appService: AppService,
    private _mapService: MapService
  ) { 
    this._unsubscribeAll = new Subject();
    this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: true
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
    };
  }
  
  ngOnInit() {
    // fancyscript();
    // aboutscript();

    this.restaurant =  JSON.parse(localStorage.getItem('restaurant'));
    console.log('this is improtant', this.restaurant);
    this.restaurant.rating= Math.round(this.restaurant.rating);
    this.lat = this.restaurant.geometry.location.lat;
    this.lng = this.restaurant.geometry.location.lng;
  
  }
  onDetails(): void{
    window.location.href="/about";
  }
  onWebsite(url): void{
    window.open(this.restaurant.website);
  }
}
