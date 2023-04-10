import { Component } from '@angular/core';
import { SvgService } from './shared/services/svg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(SvgService : SvgService ) {
    SvgService.Init();
  }
}
