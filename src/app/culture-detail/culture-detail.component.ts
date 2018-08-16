import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';

import { Culture } from '../shared/culture';
import { CultureService } from '../services/culture.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-culture-detail',
  templateUrl: './culture-detail.component.html',
  styleUrls: ['./culture-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class CultureDetailComponent implements OnInit {

  culture: Culture;
  culturecopy = null;
  cultureIds: string[];
  prev: string;
  next: string;
  visibility = 'shown';
  errMess: string;
  isLike: boolean;
  constructor(private cultureservice: CultureService,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.isLike = false;

    this.cultureservice.getCultureIds()
        .subscribe(cultureIds => this.cultureIds = cultureIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.cultureservice.getCulture(params['id']); }))
                   .subscribe(culture => { this.culture = culture; this.culturecopy = culture; this.setPrevNext(culture._id); this.visibility = 'shown'; },
                     errmess => this.errMess = <any>errmess);
  }

  setPrevNext(cultureId: string){
    const index = this.cultureIds.indexOf(cultureId);
    this.prev = this.cultureIds[(this.cultureIds.length + index - 1) % this.cultureIds.length];
    this.next = this.cultureIds[(this.cultureIds.length + index + 1) % this.cultureIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  changeColor(tabclicked): void {
    this.isLike= !this.isLike;
  }

  changeStyle(tabclicked): void {
    this.isLike= !this.isLike;
  }

}
