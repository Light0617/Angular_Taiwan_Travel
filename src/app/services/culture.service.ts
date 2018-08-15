import { Injectable } from '@angular/core';
import { Culture } from '../shared/culture';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class CultureService {

  constructor(private restangular : Restangular) { }

  getCultures(): Observable<Culture[]> {
    return this.restangular.all('cultures').getList();
  }

  getCulture(_id: string): Observable<Culture> {
    return this.restangular.one('cultures', _id).get();
  }

  getFeaturedCulture(): Observable<Culture> {
    return this.restangular.all('cultures')
               .getList({featured : true})
               .pipe(map(cultures => cultures[0]));
  }

  getCultureIds(): Observable<string[] | any> {
    return this.getCultures()
               .pipe(map(cultures => cultures.map(culture => culture._id))
               ,catchError(error => error));
  }
}
