import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentAddPageRoutingModule } from './medicament-add-routing.module';

import { MedicamentAddPage } from './medicament-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentAddPageRoutingModule
  ],
  declarations: [MedicamentAddPage]
})
export class MedicamentAddPageModule {}
