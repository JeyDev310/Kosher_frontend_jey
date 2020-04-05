import { Injectable, NgZone } from "@angular/core";
import { promise } from 'protractor';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { KSLocationModel } from 'app/model/location';
import { KSMarkerModel } from 'app/model/location';
import { async } from '@angular/core/testing';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * @description
 * @class
 */



@Injectable()
export class MapService {

  keyword = ['Steakhouse', 'Cafe', 'Arabic', 'Seafood', 'Italian', 'Pizza', 'Sushi', 'Greek'];
  quaryResults: any[]=[];
  quaryRestaurants: any;
  service: any;
  onSelectRestaurants: BehaviorSubject<any>;
  location: any;
  circleRadius: number;
  constructor(
    private _progressBarService: FuseProgressBarService
  ) {
    this.onSelectRestaurants = new BehaviorSubject([]);
    
  }
  getMapPlacesService(tempMap: any): any{
    const map = new google.maps.Map((tempMap),{
      // zoom: countries['us'].zoom,
      // center: location,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false
    });
    console.log('thsi is iimpportant3333333', map, 'tempMap', tempMap);
    return new google.maps.places.PlacesService(map);
  }
  async onGetRestauantKind(circleRadius, location): Promise<any>{
  
    console.log('this is location map', location);
        this.service = this.getMapPlacesService(location);
        this.location = location;
        this.circleRadius = circleRadius;
        await this.getRestaurantsByRadius('').then((results) => {
         
          this.quaryRestaurants = {'all': results};
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'all': null};});

        await this.getRestaurantsByRadius('Steakhouse').then((results) => {
          this.quaryRestaurants = {...this.quaryRestaurants, 'Steakhouse': results};
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Steakhouse': null};});

        await this.getRestaurantsByRadius('Cafe').then((results)=>{
          this.quaryRestaurants = {...this.quaryRestaurants,'Cafe': results};  
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Cafe': null};});

        await this.getRestaurantsByRadius('Arabic').then((results)=>{
          this.quaryRestaurants = {...this.quaryRestaurants,'Arabic': results}; 
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Arabic': null};});  

        await this.getRestaurantsByRadius('Seafood').then((results)=>{
            this.quaryRestaurants = {...this.quaryRestaurants,'Seafood': results};  
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Seafood': null};});   

        await this.getRestaurantsByRadius('Italian').then((results)=>{
          this.quaryRestaurants = {...this.quaryRestaurants,'Italian': results};  
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Italian': null};}); 

        await this.getRestaurantsByRadius('Pizza').then((results)=>{
          this.quaryRestaurants = {...this.quaryRestaurants,'Pizza': results}; 
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Pizza': null};});

        await this.getRestaurantsByRadius('Sushi').then((results)=>{
          this.quaryRestaurants = {...this.quaryRestaurants,'Sushi': results};  
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Sushi': null};});

        await this.getRestaurantsByRadius('Greek').then((results)=>{
          this.quaryRestaurants = {...this.quaryRestaurants,'Greek': results};   
        }).catch(()=>{this.quaryRestaurants = {...this.quaryRestaurants,'Greek': null};});

        this.onSelectRestaurants.next(this.quaryRestaurants);
        
  }
  getRestaurantsByRadius(keyword: string):Promise<any> {

      // this._progressBarService.beginLoading2();
       
      console.log('thsi is iimpportant', this.service, 'tempMap', this.location);
      let tempResults: any[];
      let getNextPage = null;
      if (getNextPage) getNextPage();

      let request = {
        keyword: keyword,
        location: this.location,
        radius: this.circleRadius,
        // openNow: true,
        types: ['restaurant','bar','cafe', 'food'],
        rankBy: google.maps.places.RankBy.PROMINENCE
        };
        const infowindow = new google.maps.InfoWindow();
      return new Promise((resolve,reject)=>{
          tempResults = [];
          this.service.nearbySearch(request, function(results, status, pagination){
                if(status === google.maps.places.PlacesServiceStatus.OK)
                {
                  results.map((result)=>{
                  tempResults.push(result);
                })
                   
                    if (pagination.hasNextPage){
                      // pagination.nextPage(); 
                    }else{
                      // resolve(tempResults);
                    }
                    resolve(tempResults);
                    // this._progressBarService.endLoading2();
                  }
                else{
                  reject('');
                  // this._progressBarService.endLoading2();
                }
            });
          
        }); 
      }
      getCurrentRestaurantDetail(tempMap: any): Promise<any>{
        // const service = new google.maps.places.PlacesService(tempMap);
        const service = this.getMapPlacesService(tempMap);
        console.log('thsi is iimpportant222222',service, tempMap);
        let request = {
            placeId: tempMap.place_id,
            fields: ['ALL']
          };
          return new Promise((resolve,reject)=>{
           
            service.getDetails(request, function callback(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('this is placerestaurants', results);    
                resolve(results);
              }else{
                reject('');
              }
          });
         
        });
      }
      
  }
  
  // async getRestaurantsBySearchBox( tempMap: any, circleRadius: number, templocation: Location ){

  //   // const location: Location = templocation;
  //   const service = this.getMapPlacesService(tempMap);
  //   let request = {
  //     // bounds: tempMap.getBounds(),
  //     location: location,
  //     radius: circleRadius,
  //     types: ['restaurant']
  //   };
  //   return new Promise((resolve,reject)=>{
  //       service.nearbySearch(request, function(results, status){
  //           if(status === google.maps.places.PlacesServiceStatus.OK)
  //           {
  //             console.log('this is results', results);
  //               resolve(results);    
  //           }else
  //           {
  //               reject(status);
  //           }

  //       }); 
  //   });
  // }
  
