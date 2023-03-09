import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase services + environment module
import firebase from 'firebase/compat/app';
import { FormsModule } from '@angular/forms';
let firebaseConfig = {
  apiKey: 'AIzaSyBqSR-VHVk3SEzSneh0eZ2Xu3D3eoBgz4U',
  authDomain: 'home-health-d9bbd.firebaseapp.com',
  projectId: 'home-health-d9bbd',
  storageBucket: 'home-health-d9bbd.appspot.com',
  messagingSenderId: '841244183624',
  appId: '1:841244183624:web:f1c3c170fcedc578aa1c7d',
  measurementId: 'G-9M1VVBG17K',
};
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
