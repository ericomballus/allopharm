import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentAddPage } from './medicament-add.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentAddPageRoutingModule {}
