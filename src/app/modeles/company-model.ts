import { MedicamentModel } from './medicament-model';
export class Company {
  adminId: string = '';
  name: string = '';
  email: string = '';
  telephone: string = '';
  ville: string = '';
  pays: string = '';
  quartier: string = '';
  logoURL: string = '';
  companyType: string = '';
  id: string = '';
  updateAt: any;
  createdAt: any;

  medicamentList: MedicamentModel[] = [];
  allMedicamentListId: string[] = [];

  constructor() {}

  addMedicament(data: MedicamentModel) {
    this.medicamentList.push(data);
  }

  removeMedicament(name: string) {
    this.medicamentList = this.medicamentList.filter(
      (serviceName) => serviceName.name != name
    );
  }
}
