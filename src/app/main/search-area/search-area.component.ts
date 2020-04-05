import { Component, OnInit, Input, ViewChild, ElementRef,NgZone } from "@angular/core";
import { AppService } from 'app/service/app.service';
import { Router } from '@angular/router';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MapService } from 'app/service/map.service';
import { KSCountryModel } from 'app/model/country';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'app/service/data.service';
import { circleRadius_short } from 'app/model/constants';
import { circleRadius_long } from 'app/model/constants';
import { FuseConfigService } from '@fuse/services/config.service';

interface QuaryRestaurants{
  Steakhouse: {},
  Cafe: {},
  Arabic: {},
  Seafood: {},
  Italian: {},
  Pizza: {},
  Sushi: {},
  Greek: {}
}
@Component({
  selector: "app-search-area",
  templateUrl: "./search-area.component.html",
  styleUrls: ["./search-area.component.scss"]
})

export class SearchAreaComponent implements OnInit {
  
  countryKey: string;
  
  place: any;
  quaryRestaurants: any;
  autocomplete: any;
  peoples: number[];
  tempRadius: number = circleRadius_long;
  countryRestrict = {'country': 'us'};
  countries: string[];

  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _appService: AppService,
    private _router: Router,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _mapService: MapService,
    private _dataService: DataService,
    private _fuseConfigService: FuseConfigService,
  ) 
  { 
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
    this.onAddressSeach();
    this.peoples = [];
    for (let list = 1 ; list < 15; list++){
        this.peoples.push(list);  
    }

    this.countries = [];
    this._dataService.onGetCountry
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(country => {
          console.log('this is selectBooking' , country);
          this.countries = country;
    });

  }

  
  onRestauant(): void{

    this._mapService.onGetRestauantKind(this.tempRadius, this.place.geometry.location);
    
    this._router.navigate(['/index']);

  }
  onAddressSeach(): void{
   
   
    this._mapsAPILoader.load().then(() =>{
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['(cities)'], componentRestrictions: this.countryRestrict });
        // console.log('this is map!!!!', autocomplete);
        this.autocomplete.addListener('place_changed', ()=> {
          this._ngZone.run(() => {
          this.place = this.autocomplete.getPlace();
            
          if (!this.place.geometry) {
            window.alert("No details available for input: '" + this.place.name + "'");
            return;
          }
        });
      });
    });
  }
  onCountrySelect():void{

    if (this.countryKey == 'all') {
      this.autocomplete.setComponentRestrictions({'country': []});
    } else {
      this.autocomplete.setComponentRestrictions({'country': this.countryKey});
    }
    console.log('this iscoun', this.countryKey)

  }
  onChang($event): void{
    console.log('sadssasf')
    if ($event.checked){
      this.tempRadius = circleRadius_short;
    }else{
      this.tempRadius = circleRadius_long;
    }
  }
}
