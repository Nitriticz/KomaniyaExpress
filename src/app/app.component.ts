import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    console.log();
  }

  showBars() {
    if (
      window.location.href.includes('login') ||
      window.location.href.includes('register')
    ) {
      return false;
    }
    return true;
  }
}
