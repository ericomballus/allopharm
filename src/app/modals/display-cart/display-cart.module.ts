import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayCartPageRoutingModule } from './display-cart-routing.module';

import { DisplayCartPage } from './display-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayCartPageRoutingModule
  ],
  declarations: [DisplayCartPage]
})
export class DisplayCartPageModule {}
