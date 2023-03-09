import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayCartPage } from './display-cart.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayCartPageRoutingModule {}
