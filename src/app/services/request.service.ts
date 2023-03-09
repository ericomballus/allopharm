import { Injectable } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';
import { Company } from '../modeles/company-model';
import {
  getDocs,
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { MedicamentModel } from '../modeles/medicament-model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor() {}

  get_all(collectionName: string): Promise<Company[]> {
    const db = getFirestore(); //companies
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy('name', 'asc'));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab: any[] = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  get_and_query(
    query_name: string,
    collection_name: string,
    field: string
  ): Promise<any[]> {
    const db = getFirestore();
    const colRef = collection(db, collection_name); // 'companies',  'companyType'
    const q = query(colRef, where(field, '==', query_name));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab: any[] = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getCompanyMedicament(companyId: string): Promise<MedicamentModel[]> {
    const db = getFirestore();
    const colRef = collection(db, 'medicament');
    const q = query(
      colRef,
      where('users', 'array-contains', companyId),
      limit(1000)
    );
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab: any[] = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
