import { Injectable } from '@angular/core';
import { Food } from '../shared/food';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private restangular : Restangular) { }

  getFoods(): Observable<Food[]> {
    return this.restangular.all('foods').getList();
  }

  getFood(_id: string): Observable<Food> {
    return this.restangular.one('foods', _id).get();
  }

  getFeaturedFood(): Observable<Food> {
    return this.restangular.all('foods')
               .getList({featured : true})
               .pipe(map(foods => foods[0]));
  }

  getFoodIds(): Observable<string[] | any> {
    return this.getFoods()
               .pipe(map(foods => foods.map(food => food._id))
               ,catchError(error => error));
  }
}
