import { Component, Input, ViewChild, NgZone, OnInit, ElementRef } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { MapService } from 'app/service/map.service';
import { runInThisContext } from 'vm';
import { KSLocationModel, KSMarkerModel} from 'app/model/location';

 declare var google: any;
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() resLat: number;
  @Input() resLng: number;
  @Input() flag : boolean;


  infoWindow: any;
  markerPath: string = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
  markers: any[] = [];
  markerLetter: string;
  markerIcon: string;
  geocoder:any;
  places : Array<any>; 

  marker: KSMarkerModel = {
    lat: 51.678418,
    lng: 7.809007,
    draggable: true  
  };

  location: KSLocationModel = {
    lat: 51.678418,
    lng: 7.809007,
    marker: this.marker,
    zoom: 15
  };


  @ViewChild(AgmMap, {static: false}) public map: AgmMap;

  constructor(
      private _mapsApiLoader: MapsAPILoader,
      private _zone: NgZone,
      private _wrapper: GoogleMapsAPIWrapper,
      private _mapService: MapService
  ) 
  {
    
  }

  ngOnInit() {

    // const map = this._mapService.getMapPlacesService(this.map);
    // console.log('this is map', this.map);
    if (this.flag){
      this.currentLocation();
    }else
    {
      this.setLocation();
    }

    console.log('this is map', this.location, this.map)
   
  }
  currentLocation():void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker={
          lat : position.coords.latitude,
          lng : position.coords.longitude,
          draggable: true
        } 
        console.log('this is sss',  position.coords.latitude);
        this.location={
          lat : position.coords.latitude,
          lng : position.coords.longitude,
          zoom : 15,
          marker: this.marker
        }
      });
    }
  }
  setLocation():void {
  
        this.marker={
          lat : this.resLat,
          lng : this.resLng,
          draggable: false
        }
        this.location={
          lat : this.resLat,
          lng : this.resLng,
          zoom : 15,
          marker: this.marker
        }
  }
  
}
