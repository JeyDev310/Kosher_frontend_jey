import { Component, OnInit, ViewEncapsulation, NgZone, ViewChild, ElementRef } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { $ } from 'protractor';
// import * as totalscript from '@fuse/animations/js/totalscript';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from 'app/service/app.service';
import { DataService } from 'app/service/data.service';
import { KSCountryModel, KSRegionsModel } from 'app/model/country';
import { MapService } from 'app/service/map.service';
import { circleRadius_short } from 'app/model/constants';
import { circleRadius_long } from 'app/model/constants';
import { ItemService} from 'app/service/item.service';
declare var totalscript: any;

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class WelcomeComponent implements OnInit {
  
  @ViewChild('region', {static: false}) public searchElementRef: ElementRef;

  selectBooking: number = 0;
  countries: KSCountryModel;
  regions: KSRegionsModel;
  tempRegion: string;
  place: any;
  autocomplete: any;
  isLogging: boolean = true;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _router: Router,
    private _appService: AppService,
    private _dataService: DataService,
    private _mapService: MapService,
    private _ngZone: NgZone,
    private _mapsAPILoader: MapsAPILoader,
    private _itemService : ItemService
  )  
  { 
    this._unsubscribeAll = new Subject();   
    this.selectBooking = 0;
  }

  ngOnInit() {
    this.isLogging = true;
    totalscript();

    this._appService.onSelectBooking
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectBooking => {
        this.selectBooking = selectBooking;
    });
    
    this._dataService.onGetRegions
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(regions => {
          console.log('this is regions', regions);
          if (regions != undefined && regions.length>0){
            console.log('this is selectBooking' , regions);
            this.regions = regions;
            this.isLogging = false;
          }else{
            this.isLogging = true;
          }
        
    });

  }
  // onSelectRes(): void{
  //   window.open('/restaurants');
  // }
  onIndexRes(regions): void{

    // map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: countries['us'].zoom,
    //   center: countries['us'].center,
    //   mapTypeControl: false,
    //   panControl: false,
    //   zoomControl: false,
    //   streetViewControl: false
    // });
    // this.tempRegion = regions.name;
    
    this._mapsAPILoader.load().then(() =>{
      this.autocomplete = new google.maps.LatLng(regions.center.lat, regions.center.lng );// -33.867, 151.195
          this.place = this.autocomplete;
          console.log('this is regions.name', this.place);
            this._mapService.onGetRestauantKind(circleRadius_long, this.place);
      });
      // this._itemService.getSearchItem();
      this._router.navigate(['/index']);
  }
  onSelectRes(): void{
    // this._router.navigate(['/restaurants']);
    window.open('/restaurants');
  }
  onLogin(): void{
    this._router.navigate(['/user']);
  }
  // onSearchSidebar():void{
  //   this._fuseSidebarService.getSidebar('search-panel').toggleOpen();
  // }
}
