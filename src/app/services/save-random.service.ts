import { Injectable } from '@angular/core';
import { Company } from '../modeles/company-model';
import { MedicamentModel } from '../modeles/medicament-model';

@Injectable({
  providedIn: 'root',
})
export class SaveRandomService {
  company: any;
  medicament: any;
  villes: any;
  ville: any;
  user: any;
  content: any;
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

  setVilles(docs) {
    this.villes = docs;
  }
  getVilles() {
    if (this.villes) {
      return this.villes;
    } else {
      return null;
    }
  }

  setVilleRecherche(doc) {
    this.ville = doc;
  }
  getVilleRecherche() {
    if (this.ville) {
      return this.ville;
    } else {
      return null;
    }
  }

  setUser(user: any) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  setContent(content) {
    this.content = content;
  }
  getContent() {
    return this.content;
  }
}
