import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { WelcomeComponent } from 'app/main/welcome/welcome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AboutComponent } from 'app/main/about/about.component';
import { FooterComponent } from 'app/main/@shared/footer/footer.component';
import { ReviewSliderComponent } from 'app/main/@shared/review-slider/review-slider.component';
import { HeaderComponent } from 'app/main/@shared/header/header.component';
import { IndexComponent } from 'app/main/index/index.component';
import { RestaurantsComponent } from 'app/main/restaurants/restaurants.component';
import { SearchComponent } from 'app/main/search/search.component';
import { SearchItemComponent } from 'app/main/search/search-item/search-item.component';
import { LoginComponent } from 'app/main/login/login.component';
import { RestaurantsListComponent } from 'app/main/restaurants-list/restaurants-list.component';
import { ImageFancyComponent } from 'app/main/@shared/image-fancy/image-fancy.component';
import { SearchListComponent } from 'app/main/search-list/search-list.component';

import { environment } from '../environments/environment';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { AppService } from 'app/service/app.service';
import { UserService } from 'app/service/user.service';
import { MapService } from 'app/service/map.service';
import { DataService } from 'app/service/data.service';
import { MapComponent } from 'app/main/map/map.component';
import { FormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ItemService } from 'app/service/item.service';
import { SearchAreaComponent } from 'app/main/search-area/search-area.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//import { OwlModule } from 'ngx-owl-carousel';  
const appRoutes: Routes = [
    {
        path      : 'user',
        component: LoginComponent
    },
    {
        path      : 'welcome',
        component: WelcomeComponent,
        resolve  : {
            data: DataService
        }
    },
    {
        path      : 'restaurants',
        component: RestaurantsComponent,
        resolve  : {
            data: DataService
        }
    },
    {
        path      : 'about',
        component: AboutComponent
    },
    {
        path      : 'index',
        component: IndexComponent,
        resolve  : {
            data: ItemService
        }
    },
    {
        path      : 'search',
        component: SearchAreaComponent
    },
    {
        path      : 'restaurantslist',
        component : RestaurantsListComponent,
        resolve  : {
            data: DataService
        }
    },
    {
        path        : '',
        redirectTo  : 'welcome',
        pathMatch   : 'full'
    },
];

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        RestaurantsComponent,
        AboutComponent,
        FooterComponent,
        ReviewSliderComponent,
        HeaderComponent,
        IndexComponent,
        SearchComponent,
        SearchItemComponent,
        LoginComponent,
        RestaurantsListComponent,
        ImageFancyComponent,
        SearchListComponent,
        SearchAreaComponent,
        MapComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,
        RouterModule.forRoot(appRoutes),
        AgmCoreModule.forRoot(environment.googleConfig),
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,
        MatSelectModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        NgxMaterialTimepickerModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
       // OwlModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        // RatingModule,
        // App modules
        LayoutModule,
        SampleModule,
        FormsModule,
        NgxStarRatingModule
    ],
    providers: [    
        { provide: FirestoreSettingsToken, useValue: {} },
        AppService,
        UserService,
        MapService,
        GoogleMapsAPIWrapper,
        DataService,
        ItemService
        
    ],
    bootstrap   : [
        AppComponent,
    ]
})
export class AppModule
{
}
