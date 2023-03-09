import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { resolve } from 'dns';
import { DetailsPage } from '../modals/details/details.page';
import { Company } from '../modeles/company-model';
import { MedicamentModel } from '../modeles/medicament-model';
import { ToDisplay } from '../modeles/to-display-model';
import { NotificationService } from '../services/notification.service';
import { RequestService } from '../services/request.service';
import { SaveRandomService } from '../services/save-random.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  companies_list: Company[] = [];
  array_data: ToDisplay[] = [];
  constructor(
    private request: RequestService,
    private notifi: NotificationService,
    private modalCrtl: ModalController,
    private random: SaveRandomService
  ) {
    this.get_companies();
  }

  /**
   * 1- get random medicament ensuite chercher les companies qui ont ce medicament
   *
   */
  async get_companies() {
    this.notifi.presentLoading(10000);
    try {
      this.companies_list = await this.request.get_and_query(
        'pharmacie',
        'companies',
        'companyType'
      );
      this.notifi.dismissLoading();
      console.log(this.companies_list);
      /* for (const companie of this.companies_list) {
        let c: any[] = await this.get_companies_medicament(companie);
        console.log('====>', c);
        if (c.length) {
          let data: ToDisplay = { companie: companie, medicamentList: c };
          this.array_data.push(data);
        }
      }*/
    } catch (error) {
      this.notifi.dismissLoading();
      console.log(error);
    }
  }
  async get_companies_medicament(
    companie: Company
  ): Promise<MedicamentModel[]> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let res: any[] = await this.request.getCompanyMedicament(companie.id);
        resolve(res);
      } catch (error) {}
    });
  }

  async display_medicament(medicament: MedicamentModel, companie: Company) {
    console.log(medicament);
    this.random.setMedicament(medicament);
    this.random.setCompany(companie);
    const modal = await this.modalCrtl.create({
      component: DetailsPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }
}
