import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { MountainComponent } from '../mountain/mountain.component';
import { FoodComponent } from '../food/food.component';
import { CultureComponent } from '../culture/culture.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'about',  component: AboutComponent},
  { path: 'mountain',     component: MountainComponent},
  { path: 'food',     component: FoodComponent},
  { path: 'culture',     component: CultureComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
