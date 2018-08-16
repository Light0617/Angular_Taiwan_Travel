import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FoodComponent } from './food/food.component';
import { CultureComponent } from './culture/culture.component';
import { AboutComponent } from './about/about.component';
import { baseURL } from './shared/baseurl';


import { AppRoutingModule } from './app-routing/app-routing.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import 'hammerjs';
import { MountainComponent } from './mountain/mountain.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { MountainDetailComponent } from './mountain-detail/mountain-detail.component';
import { CultureDetailComponent } from './culture-detail/culture-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FoodComponent,
    CultureComponent,
    AboutComponent,
    MountainComponent,
    FoodDetailComponent,
    MountainDetailComponent,
    CultureDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatSlideToggleModule,

    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
