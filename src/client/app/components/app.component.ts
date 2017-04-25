import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = "bootstrap";
    this.toastyConfig.position = "top-right";
  }
  //TODO make a better fix for scroll-problem than changing page
  onDeactivate() {
    document.body.scrollTop = 0;
  }

}
