import { Company } from './company-model';
import { MedicamentModel } from './medicament-model';

export interface ToDisplay {
  companie: Company;
  medicamentList: MedicamentModel[];
}
