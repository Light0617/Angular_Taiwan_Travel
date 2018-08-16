import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';

import { Food } from '../shared/food';
import { FoodService } from '../services/food.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
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
export class FoodDetailComponent implements OnInit {

  food: Food;
  foodcopy = null;
  foodIds: string[];
  prev: string;
  next: string;
  visibility = 'shown';
  errMess: string;
  isLike: boolean;
  constructor(private foodservice: FoodService,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.isLike = false;

    this.foodservice.getFoodIds()
        .subscribe(foodIds => this.foodIds = foodIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.foodservice.getFood(params['id']); }))
                   .subscribe(food => { this.food = food; this.foodcopy = food; this.setPrevNext(food._id); this.visibility = 'shown'; },
                     errmess => this.errMess = <any>errmess);
  }

  setPrevNext(foodId: string){
    const index = this.foodIds.indexOf(foodId);
    this.prev = this.foodIds[(this.foodIds.length + index - 1) % this.foodIds.length];
    this.next = this.foodIds[(this.foodIds.length + index + 1) % this.foodIds.length];
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
