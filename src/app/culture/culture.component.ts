import { Component, OnInit, Inject} from '@angular/core';
import { Culture } from '../shared/culture';
import { CultureService } from '../services/culture.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class CultureComponent implements OnInit {

  cultures: Culture[];
  errMess: string;

  constructor(private cultureService: CultureService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.cultureService.getCultures()
        .subscribe(cultures => {this.cultures = cultures;},
                   errmess => this.errMess = <any>errmess.message);
  }


}
