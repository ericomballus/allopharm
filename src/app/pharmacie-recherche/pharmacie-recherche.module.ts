import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PharmacieRecherchePageRoutingModule } from './pharmacie-recherche-routing.module';

import { PharmacieRecherchePage } from './pharmacie-recherche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PharmacieRecherchePageRoutingModule
  ],
  declarations: [PharmacieRecherchePage]
})
export class PharmacieRecherchePageModule {}
