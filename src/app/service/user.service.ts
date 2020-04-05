import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { RUserModel } from 'app/model/user';
import { User } from 'firebase';
import { COLLECTION_USERS } from 'app/model/constants';

/**
 * @description
 * @class
 */
@Injectable()
export class UserService {

  googleUserInfo: RUserModel;
  users: RUserModel[];
  rUser: RUserModel;
  authUser: User;
  onGoogleUserInfoChanged: BehaviorSubject<any>;
  onUserInfoChanged: BehaviorSubject<any>;

  constructor(
    private _afAuth: AngularFireAuth, 
    private _progressBarService: FuseProgressBarService,
    private _db: AngularFirestore,
  ) {
    this.onGoogleUserInfoChanged = new BehaviorSubject([]);
    this.onUserInfoChanged = new BehaviorSubject([]);

  }
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this._afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }  
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this._afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }
  async login(email: string, password: string): Promise<any> {
    this._progressBarService.beginLoading2(); 
    return new Promise<any> ((resolve, reject) => {
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(authUser => {
        this.getUser(authUser.user.uid)
            .then(rUser => {
                if (rUser !== false){
                    this.onUserInfoChanged.next(rUser);
                    this.updatedUser(rUser); 
                    resolve(rUser);
                    this._progressBarService.endLoading2();
                }
                else{
                    resolve(false);
                    this._progressBarService.endLoading2();
                }
              
            })
        }, reject)
        .catch((error) => {
        });
      });
  }
  async getUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (userId != null && userId !== '') {
            const docRef = this._db.collection(COLLECTION_USERS).doc(userId).get();
            docRef.subscribe((doc) => {
                let user: any;

                user = {
                    ...doc.data()
                };                
                if (!user.uid){
                    resolve(false);
                }
                this.rUser = new RUserModel(user.uid, user);
                resolve(this.rUser);
            }, reject);
        }
        else{
            // this.hlUser = new HLUserModel('', {});
            resolve(false);
        }
    });
  }
  async register(data: any): Promise<any> {
    this._progressBarService.beginLoading2(); 
    return new Promise<any> ((resolve, reject) => {
        this._afAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then((newUserCredential: firebase.auth.UserCredential) => {
            const rUser = {            
                uid: newUserCredential.user.uid,
                email: newUserCredential.user.email,
                // firstName: data.firstName,
                // lastName: data.lastName,
                token: newUserCredential.user.refreshToken,      
                createdAt: Date.now(),
            };
            const collectionRef = this._db.collection(COLLECTION_USERS).doc(rUser.uid);
            collectionRef
            .set(rUser, { merge: true }) // hlUser.toJSON())
            .then(() => {

                this.rUser = new RUserModel(rUser.uid, rUser);
                
                this.onUserInfoChanged.next(this.rUser);
                this.updatedUser(this.rUser); 
                resolve(this.rUser);
                this._progressBarService.endLoading2();
            })
            .catch( error => {
                console.log(error);
            });
        }, reject);
    });        
  }
  
  updatedUser(rUser: RUserModel): void{
    this.rUser = rUser;
    // this._appService.curUser = this.rUser;
    this.onUserInfoChanged.next(this.rUser);
    this.saveHLUserToLocal();
  }
  saveHLUserToLocal(): void{
    localStorage.setItem('rUser', JSON.stringify(this.rUser));
  }

}
