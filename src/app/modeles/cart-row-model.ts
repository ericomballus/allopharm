import { Company } from './company-model';
import { MedicamentModel } from './medicament-model';

export class CartRow {
  totalPrice: number = 0;
  prix: number = 0;
  constructor(
    public medicament: MedicamentModel,
    public company: Company,
    public quantity: number
  ) {
    this.prix = 0;
  }
}
