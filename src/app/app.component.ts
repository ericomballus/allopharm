import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate = [
    {
      title: 'MENU.signup',
      url: '/inscription',
      icon: 'home',
      color: 'tertiary',
    },
    {
      title: 'MENU.login',
      url: '/auth',
      icon: 'cart',
      color: 'success',
    },
  ];
  selectedLanguage: any;
  constructor(private plt: Platform) {
    this.selectedLanguage = 'fr';
  }

  disconnect() {}
}
