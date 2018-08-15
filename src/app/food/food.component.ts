import { Component, OnInit, Inject } from '@angular/core';
import { Food } from '../shared/food';
import { FoodService } from '../services/food.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FoodComponent implements OnInit {

  foods: Food[];
  errMess: string;

  constructor(private foodService: FoodService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.foodService.getFoods()
        .subscribe(foods => {this.foods = foods;},
                   errmess => this.errMess = <any>errmess.message);
  }

}
