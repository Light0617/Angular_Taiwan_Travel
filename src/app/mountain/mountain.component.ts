import { Component, OnInit, Inject } from '@angular/core';


import { Mountain } from '../shared/mountain';
import { MountainService } from '../services/mountain.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-nature',
  templateUrl: './mountain.component.html',
  styleUrls: ['./mountain.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MountainComponent implements OnInit {

  mountains: Mountain[];
  errMess: string;

  constructor(private mountainService: MountainService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.mountainService.getMountains()
        .subscribe(mountains => {this.mountains = mountains;},
                   errmess => this.errMess = <any>errmess.message);
  }

}
