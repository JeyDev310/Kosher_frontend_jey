import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { COLLECTION_COUNTRY, COLLECTION_REGIONS, COLLECTION_SEARCHITEM } from 'app/model/constants';
import { KSCountryModel, KSRegionsModel } from 'app/model/country';
import { BehaviorSubject, Observable } from 'rxjs';
import { KSLocationModel } from 'app/model/location';
import { KSMarkerModel } from 'app/model/location';
import { KSSearchItemModel } from 'app/model/search';
/**
 * @description
 * @class
 */
@Injectable()
export class DataService {

  countryInfo: KSCountryModel[];
  resionsInfo: KSRegionsModel[];
  searchItemInfo: KSSearchItemModel[];
  
  onGetCountry : BehaviorSubject<any>;
  onGetRegions : BehaviorSubject<any>;
  constructor(
    private _db: AngularFirestore
    ) 
    {
      this.onGetCountry = new BehaviorSubject([]);
      this.onGetRegions = new BehaviorSubject([]);
    
    }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      // this.onCarsInfoChanged.next(this.Cars_Info);
    return new Promise((resolve, reject) => {
        Promise.all([])
            .then(() => {
            this.getCountry();
            this.getRegions();
            
                // this.getCarsInfo(this.user.uid);
                resolve();
            },
            reject
        ); 
    });
  }
  async getCountry(): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        const queryRef = await this._db.collection(COLLECTION_COUNTRY).get();
        await queryRef.subscribe((snapshot) => {
           
            this.countryInfo = [];
            snapshot.forEach((doc) => {
                const approver = {
                    ...doc.data()
                };
                this.countryInfo.push(new KSCountryModel(approver));
            });
            this.onGetCountry.next(this.countryInfo);
            // this._progressBarService.endLoading2();
            resolve();
        }, reject);
    });
  }

  async getRegions(): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        const queryRef = await this._db.collection(COLLECTION_REGIONS).get();
        await queryRef.subscribe((snapshot) => {
           
            this.resionsInfo = [];
            snapshot.forEach((doc) => {
                const approver = {
                    ...doc.data()
                };
                this.resionsInfo.push(new KSRegionsModel(approver));
            });
            this.onGetRegions.next(this.resionsInfo);
            resolve();
        }, reject);
    });
  }

//   async getSearchItem(): Promise<any>{
//     return new Promise(async(resolve, reject)=>{
//         const queryRef = await this._db.collection(COLLECTION_SEARCHITEM).get();
//         await queryRef.subscribe((snapshot) => {
           
//             this.searchItemInfo = [];
//             snapshot.forEach((doc) => {
//                 const approver = {
//                     ...doc.data()
//                 };
//                 this.searchItemInfo.push(new KSSearchItemModel(approver));
//             });
//             this.onGetSearchItem.next(this.searchItemInfo);
//             resolve();
//         }, reject);
//     });
//   }
}
