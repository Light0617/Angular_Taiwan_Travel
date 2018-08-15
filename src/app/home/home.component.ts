import { Component, OnInit, Inject } from '@angular/core';

import { Mountain } from '../shared/mountain';
import { MountainService } from '../services/mountain.service';
import { Culture } from '../shared/culture';
import { CultureService } from '../services/culture.service';
import { Food } from '../shared/food';
import { FoodService } from '../services/food.service';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  mountain: Mountain;
  culture: Culture;
  food: Food;
  errMess: string;

  constructor(private foodService: FoodService,
              private mountainService: MountainService,
              private cultureService: CultureService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.foodService.getFeaturedFood()
        .subscribe(food => this.food = food,
                  errmess => this.errMess = <any>errmess.message);
    this.mountainService.getFeaturedMountain()
        .subscribe(mountain => this.mountain = mountain,
                   errmess => this.errMess = <any>errmess.message);
    this.cultureService.getFeaturedCulture()
        .subscribe(culture => this.culture = culture,
                   errmess => this.errMess = <any>errmess.message);
  }

}
