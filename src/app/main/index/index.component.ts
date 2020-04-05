import { Component, OnInit, ViewChild } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { AppService } from 'app/service/app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BrowserStack } from 'protractor/built/driverProviders';
import { MapService } from 'app/service/map.service';
import { DataService } from 'app/service/data.service';
import { KSSearchItemModel } from 'app/model/search';
import { KSLocationModel, KSMarkerModel} from 'app/model/location';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { ItemService } from 'app/service/item.service';
declare var aboutscript: any;

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})

export class IndexComponent implements OnInit {
  
  @ViewChild(AgmMap, {static: false})  indexMap: AgmMap;

  restaurants: any;
  selectRestaurants: any[];
  searchItem: KSSearchItemModel[];
  flag: boolean = false;
  search_text: string ='';
  checkBoxEevent: boolean;
  errFlag: boolean =false;
  query_test: string = '';
  isLogging: boolean = true;
  iconUrl : string  = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
  marker: KSMarkerModel = {
    lat: 51.678418,
    lng: 7.809007,
    draggable: false  
  };

  location: KSLocationModel = {
    lat: 51.678418,
    lng: 7.809007,
    marker: this.marker,
    zoom: 15
  };


  private _unsubscribeAll: Subject<any>;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _router: Router,
    private _appService: AppService,
    private _mapService: MapService,
    private _dataService: DataService,
    private _itemService: ItemService
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
  }
  }
  ngOnInit() {
    
    this.search_text = '';
    this.query_test='';
    this.errFlag= false;
    aboutscript();

    this.isLogging = true;
    console.log('this is is logging', this.isLogging)
    this.location.lat = this._mapService.location.lat();
    this.location.lng = this._mapService.location.lng();
    this.location.zoom = 15;
    console.log('this is location!!!!', this.location);


    this._mapService.onSelectRestaurants
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(restaurants => {
          // if (restaurants == true) {

            if (restaurants.all != undefined) {
              this.restaurants = restaurants;
              this.selectRestaurants = restaurants.all;
            
              if (this.selectRestaurants != undefined) {
                this.selectRestaurants.map( restaurant => {
                  console.log('this is err', restaurant);
                  restaurant.rating = Math.round(restaurant.rating);
                });
              }
              this.isLogging = false;
              console.log('this is is logging', this.isLogging, restaurants);
            }else{
              this.isLogging = true;
            }
    });
    this._itemService.onGetSearchItem
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(searchItem => {
          // if (restaurants == true) {
              this.searchItem = searchItem;
              console.log('this is searchItem', this.searchItem);    
    });
  }
  restaurantMapMarker(): void{
    // let map = new google.maps.Map(this.indexMap , {
    //   zoom: 14,
    //   lat: this.location.lng,
    //   lng: this.location.lng 
    // });
    
    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   title: 'Hello World!'
    // });
  }
    onSelectRes(restaurant): void{
      this._mapService.getCurrentRestaurantDetail(restaurant).then((restaurant) => {
        localStorage.setItem('restaurant', JSON.stringify(restaurant));
        window.open('/restaurants');
      });
    }
  
  
  
  onResList(item): void{
    //this.router.navigate(['/restaurants']);
    console.log('this is item', item);
    switch (item) {
      case 'Steakhouse':
        console.log('this is asdfasdaf', this.restaurants.Steakhouse);
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Steakhouse,'title':'Steakhouse'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Cafe':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Cafe,'title':'Cafe'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Arabic':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Arabic,'title':'Arabic'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Seafood':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Seafood,'title':'Seafood'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Italian':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Italian,'title':'Italian'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Pizza':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Pizza,'title':'Pizza'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Sushi':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Sushi,'title':'Sushi'});
        this._router.navigate(['/restaurantslist']);
        break;
      case 'Greek':
        this._appService.onCurrentRestaurants.next({'data':this.restaurants.Greek,'title':'Greek'});
        this._router.navigate(['/restaurantslist']);
        break;
      default: break;
    }
   
  }
  onClickShowAll(): void{
    this._appService.onCurrentRestaurants.next({'data':this.selectRestaurants,'title': this.query_test});
    this._router.navigate(['/restaurantslist']);
  }
  onCheckChange($event, item): void{

    this.query_test='';

    if ($event.checked) { 
      this.search_text = this.search_text.concat(item,',');
    }else{
      this.search_text = this.search_text.replace(item+',','');
    }
    this.query_test= this.search_text.substr(0, this.search_text.length -1);
    this._mapService.getRestaurantsByRadius(this.query_test).then((restaurants) => {
      this.errFlag= false;
      this.selectRestaurants = restaurants;
      console.log('this is restaurants', this.selectRestaurants);
    }).catch((err)=>{
      this.errFlag=true;
      this.selectRestaurants = [];
    });
  }
}
