import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements DoCheck {
  show = false;

  constructor() {}

  ngDoCheck() {
    if (
      window.location.href.includes('login') ||
      window.location.href.includes('register')
    ) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
}
