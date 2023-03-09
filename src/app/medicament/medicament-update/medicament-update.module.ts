import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentUpdatePageRoutingModule } from './medicament-update-routing.module';

import { MedicamentUpdatePage } from './medicament-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentUpdatePageRoutingModule
  ],
  declarations: [MedicamentUpdatePage]
})
export class MedicamentUpdatePageModule {}
