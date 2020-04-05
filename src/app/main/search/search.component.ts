import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { AppService } from 'app/service/app.service';
import { MapService } from 'app/service/map.service';
import { KSCountryModel } from 'app/model/country';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'app/service/data.service';
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})

export class SearchComponent implements OnInit {

  contries: KSCountryModel[];

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _appService: AppService,
    private _mapService: MapService,
    private _dataService: DataService,
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
    this.contries = [];
    this._dataService.onGetCountry
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(country => {
     
          this.contries = country;
    });

  }
  onSelectBooking(event): void{
    this._appService.onSelectBooking.next(event.index);
  }
}
