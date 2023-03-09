import { Injectable } from '@angular/core';
import { Company } from '../modeles/company-model';
import { MedicamentModel } from '../modeles/medicament-model';

@Injectable({
  providedIn: 'root',
})
export class SaveRandomService {
  company: any;
  medicament: any;
  constructor() {}

  setCompany(company: Company) {
    this.company = company;
  }
  getCompany(): Company {
    return this.company;
  }

  setMedicament(medica: MedicamentModel) {
    this.medicament = medica;
  }
  getMedicament(): MedicamentModel {
    return this.medicament;
  }
}
