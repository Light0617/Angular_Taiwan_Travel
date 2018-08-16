import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';

import { Mountain } from '../shared/mountain';
import { MountainService } from '../services/mountain.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-mountain-detail',
  templateUrl: './mountain-detail.component.html',
  styleUrls: ['./mountain-detail.component.scss'],
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
export class MountainDetailComponent implements OnInit {

  mountain: Mountain;
  mountaincopy = null;
  mountainIds: string[];
  prev: string;
  next: string;
  visibility = 'shown';
  errMess: string;
  isLike: boolean;
  constructor(private mountainservice: MountainService,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.isLike = false;

    this.mountainservice.getMountainIds()
        .subscribe(mountainIds => this.mountainIds = mountainIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.mountainservice.getMountain(params['id']); }))
                   .subscribe(mountain => { this.mountain = mountain; this.mountaincopy = mountain; this.setPrevNext(mountain._id); this.visibility = 'shown'; },
                     errmess => this.errMess = <any>errmess);
  }

  setPrevNext(mountainId: string){
    const index = this.mountainIds.indexOf(mountainId);
    this.prev = this.mountainIds[(this.mountainIds.length + index - 1) % this.mountainIds.length];
    this.next = this.mountainIds[(this.mountainIds.length + index + 1) % this.mountainIds.length];
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
