import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./customer/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./customer/inscription/inscription.module').then(
        (m) => m.InscriptionPageModule
      ),
  },
  {
    path: 'medicament-list',
    loadChildren: () =>
      import('./medicament/medicament-list/medicament-list.module').then(
        (m) => m.MedicamentListPageModule
      ),
  },
  {
    path: 'medicament-add',
    loadChildren: () =>
      import('./medicament/medicament-add/medicament-add.module').then(
        (m) => m.MedicamentAddPageModule
      ),
  },
  {
    path: 'medicament-update',
    loadChildren: () =>
      import('./medicament/medicament-update/medicament-update.module').then(
        (m) => m.MedicamentUpdatePageModule
      ),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./modals/details/details.module').then(
        (m) => m.DetailsPageModule
      ),
  },
  {
    path: 'display-cart',
    loadChildren: () =>
      import('./modals/display-cart/display-cart.module').then(
        (m) => m.DisplayCartPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
