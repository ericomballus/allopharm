import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PanierGroup } from 'src/app/modeles/panier-group-model';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SaveRandomService } from 'src/app/services/save-random.service';

@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.page.html',
  styleUrls: ['./display-cart.page.scss'],
})
export class DisplayCartPage implements OnInit {
  Cart: any[] = [];
  totalPrice: number = 0;
  customer: any;
  constructor(
    private modalCrtl: ModalController,
    private cartService: CartService,
    private notifi: NotificationService,
    //  private commandeService: CommandesService,
    private randomStorage: SaveRandomService
  ) {}

  ngOnInit() {
    this.Cart = this.cartService.getCartRow();
    //this.customer = this.randomStorage.getUser();
    this.Cart.forEach((grp) => {
      grp.medicament.forEach((row: any) => {
        let prix = row.quantity * parseInt(row.medicament.sellingPrice);
        row['prix'] = prix;

        if (grp.totalPrice) {
          grp.totalPrice =
            grp.totalPrice +
            row.quantity * parseInt(row.medicament.sellingPrice);
        } else {
          grp.totalPrice = row.quantity * parseInt(row.medicament.sellingPrice);
        }
      });
    });
    this.totalPrice = this.cartService.totalPrice();
  }
  closeModal() {
    console.log('je ferme la fenetere ici');

    this.modalCrtl.dismiss();
  }

  removeToCart(doc: any, medicament: any, i: any, j: any) {
    this.cartService.removeOne(medicament);
    // this.Cart[j].medicament[i].quantity =
    // this.Cart[j].medicament[i].quantity - 1;
    let qty = this.Cart[j].medicament[i].quantity;
    if (qty) {
      this.Cart[j].totalPrice =
        this.Cart[j].totalPrice -
        parseInt(this.Cart[j].medicament[i].medicament.sellingPrice);
    }

    // this.Cart = this.cartService.getCartRow();
    this.totalPrice = this.cartService.totalPrice();
  }
  async commander() {
    /* try {
      await this.notifi.presentAlertConfirm('acheter les médicament ?');
      this.notifi.presentLoading(10000);
      let Cart: PanierGroup[] = this.cartService.getCartRow();
      let promiseTab = [];
      Cart.forEach((panier) => {
        let tab = [];
        panier.medicament.forEach((cart) => {
          tab.push({
            medicament: cart.medicament,
            quantity: cart.quantity,
            totalPrice: cart.totalPrice,
            companyId: cart.company.id,
            companyName: cart.company.name,
          });
        });
        let data = {
          panier: tab,
          companyId: panier.medicament[0].company.id,
          customerId: this.customer.uid,
        };
        promiseTab.push(this.commandeService.postCommande(data));
      });
      Promise.all(promiseTab).then((res) => {
        this.notifi.dismissLoading();
        this.notifi.presentToast(
          'votre commande a été enregistré',
          'success',
          2000
        );
        this.cartService.cleanCart();
        this.modalCrtl.dismiss({ result: true });
      });
    } catch (error) {
      console.log(error);
    }*/
  }

  async commandePharmacie(doc: any, index: any) {
    /*  console.log(index);
    this.randomStorage.setData(doc);
    const modal = await this.modalCrtl.create({
      component: ConfirmPage,
      backdropDismiss: false,
    });
    modal.onDidDismiss().then(async (data) => {
      if (data.data && data.data.result) {
        this.Cart.splice(index, 1);

        if (!this.Cart.length) {
          setTimeout(() => {
            // this.closeModal();
            this.cartService.cleanCart();
            this.modalCrtl.dismiss({ result: true });
          }, 1000);
        }
      }
      // this.modalCrtl.dismiss('update');
    });
    return await modal.present().then((created) => {
      //
    });
    */
  }
}
