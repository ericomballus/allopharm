import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Company } from 'src/app/modeles/company-model';
import { MedicamentModel } from 'src/app/modeles/medicament-model';
import { CartService } from 'src/app/services/cart.service';
import { SaveRandomService } from 'src/app/services/save-random.service';
import { DisplayCartPage } from '../display-cart/display-cart.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  company: Company;
  medicament: MedicamentModel;
  totalArticles = 0;
  constructor(
    private modalCrtl: ModalController,
    private random: SaveRandomService,
    private cart: CartService
  ) {
    this.company = this.random.getCompany();
    this.medicament = this.random.getMedicament();
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.company);
      console.log(this.medicament);
    }, 2500);
  }

  close_modal() {
    this.modalCrtl.dismiss();
  }
  addToCart() {
    this.cart.add(this.medicament, this.company);
    console.log(this.cart.getCartRow());
    this.totalArticles = this.cart.total();

    // this.cart.push(doc);
  }
  async displayCart() {
    const modal = await this.modalCrtl.create({
      component: DisplayCartPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data: any) => {
      this.totalArticles = this.cart.total();
      if (data.data && data.data.result) {
        // this.location.back();
        // this.router.navigateByUrl('user-home');
      }
    });
    return await modal.present();
  }
}
