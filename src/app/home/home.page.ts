import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { resolve } from 'dns';
import { DetailsPage } from '../modals/details/details.page';
import { FilterPage } from '../modals/filter/filter.page';
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
  listTab: any[] = [];
  listab2: any[];
  arr: any[] = [];
  arrOfPromise = [];
  constructor(
    private request: RequestService,
    private notifi: NotificationService,
    private modalCrtl: ModalController,
    private random: SaveRandomService,
    private router: Router
  ) {
    this.get_companies();
    this.getMedocs();
    this.getVille();
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
  handleInput(event) {
    // console.log(event);
    const query = event.detail.value.toLowerCase();
    console.log(query);
    if (query) {
      this.listab2 = this.listTab.filter((item) => {
        return item.name.toLowerCase().indexOf(query) > -1;
        // item.style.display = shouldShow ? 'block' : 'none';
      });
    } else {
      this.listab2 = [];
    }

    console.log(this.listab2);
  }

  async selectVille() {
    const modal = await this.modalCrtl.create({
      component: FilterPage,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);

      this.findAll();
    });
    return await modal.present();
  }

  getVille() {
    this.request.getAllNotRealtimeVille().then((docs: any[]) => {
      this.random.setVilles(docs);
    });
  }

  async findAll() {
    let customer: any = this.random.getUser();

    if (!customer) {
      this.notifi
        .presentAlertConfirm('veillez crée un compte ou authentifier vous')
        .then((r) => {
          this.router.navigateByUrl('connexion');
        })
        .catch((err) => {
          // this.location.back();
        });
    } else {
      let objRandom = {};
      this.notifi.presentLoading(20000);
      let tab = [];
      let recherche = [];
      console.log(this.arr);
      
      this.arr.forEach(async (medoc, index) => {
        console.log(index);

        let result: Company[] = await this.request.getWhoSaleMedicament2(
          medoc.id
        );
        if (result.length) {
          result.forEach((company) => {
            const found = company.medicamentList.find((r) => r.id == medoc.id);
            if (found) {
              if (!objRandom[company.name]) {
                let tab = [];
                tab.push(found);
                objRandom[company.name] = { company: company, medicament: tab };
              } else {
                objRandom[company.name].medicament.push(found);
              }
            }
          });
        }
        let data = { resultat: result, medicament: this.arr[index] };
        this.arrOfPromise.push(data);

        if (this.arr.length == this.arrOfPromise.length) {
          let tab = [];
          for (const key in objRandom) {
            let resutlt = {
              name: objRandom[key]['company']['name'],
              company: objRandom[key]['company'],
              medicament: objRandom[key]['medicament'],
            };
            tab.push(resutlt);
          }
          console.log('content====>', tab);

          this.random.setContent(tab);
          this.router.navigateByUrl('pharmacie-recherche'); //pharmacie-recherche
          this.notifi.dismissLoading();
        }
      });
    }
  }

  addMedicament(medicament: any) {
    let index = this.arr.findIndex((medoc) => medoc.id == medicament.id);

    if (index >= 0) {
      this.arr = this.arr.filter((medoc) => medoc.id !== medicament.id);
    } else {
      this.arr.push(medicament);
    }
  }

  getMedocs() {
    this.request.getAllNotRealtimeMedicament().subscribe((data) => {
      this.listTab = data;
      this.notifi.dismissLoading();
    });
  }
}
