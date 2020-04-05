import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { AppService } from 'app/service/app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MapService } from 'app/service/map.service';
import { KSLocationModel, KSMarkerModel} from 'app/model/location';
import { MapsAPILoader, AgmMap } from "@agm/core";

@Component({
  selector: "app-restaurants-list",
  templateUrl: "./restaurants-list.component.html",
  styleUrls: ["./restaurants-list.component.scss"]
})

export class RestaurantsListComponent implements OnInit{
  restaurantsList: any;
  title: string;
  
  
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _router: Router,
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

    this._appService.onCurrentRestaurants
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(restaurants => {
        if (restaurants != undefined && restaurants != null) {
            this.restaurantsList = restaurants.data;
            this.restaurantsList.map((restaurant)=>{
              restaurant.rating = Math.round(restaurant.rating);
            });
            console.log('this is restaurant', this.restaurantsList);
            this.title = restaurants.title;
        } 
    });
  }

  onSelectRes(restaurant): void{
    // this.router.navigate(['/restaurants']);
    // console.log('this is id', id);

      this._mapService.getCurrentRestaurantDetail(restaurant).then((restaurant) => {
      localStorage.setItem('restaurant', JSON.stringify(restaurant));
      window.open('/restaurants');
       
    });
  }
  onRate(event):void{
    
  }
}

