import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PharmacieRecherchePage } from './pharmacie-recherche.page';

const routes: Routes = [
  {
    path: '',
    component: PharmacieRecherchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacieRecherchePageRoutingModule {}
