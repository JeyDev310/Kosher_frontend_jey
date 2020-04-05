import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * @description
 * @class
 */
@Injectable()
export class AppService {

  onSelectBooking: BehaviorSubject<any>;
 
  onCurrentRestaurants: BehaviorSubject<any>;
  onCurrentRestaurant: BehaviorSubject<any>;
  constructor() {

    this.onSelectBooking = new BehaviorSubject([]);
    
    this.onCurrentRestaurants = new BehaviorSubject([]);
    this.onCurrentRestaurant = new BehaviorSubject([]);
  }


}
