import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentUpdatePage } from './medicament-update.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentUpdatePageRoutingModule {}
