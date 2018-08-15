import { Injectable } from '@angular/core';
import { Mountain } from '../shared/mountain';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class MountainService {

  constructor(private restangular : Restangular) { }

  getMountains(): Observable<Mountain[]> {
    return this.restangular.all('mountains').getList();
  }

  getMountain(_id: string): Observable<Mountain> {
    return this.restangular.one('mountains', _id).get();
  }

  getFeaturedMountain(): Observable<Mountain> {
    return this.restangular.all('mountains')
               .getList({featured : true})
               .pipe(map(mountains => mountains[0]));
  }

  getMountainIds(): Observable<string[] | any> {
    return this.getMountains()
               .pipe(map(mountains => mountains.map(mountain => mountain._id))
               ,catchError(error => error));
  }
}
