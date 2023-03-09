import { CartRow } from './cart-row-model';

export interface PanierGroup {
  name: string;
  medicament: CartRow[];
  totalPrice: number;
}
