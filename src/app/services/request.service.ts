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
import { SaveRandomService } from './save-random.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  medicamentList$ = new BehaviorSubject([]);
  listRandom: any[] = [];
  lastVisible: any;
  constructor(private random: SaveRandomService) {}

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

  getAllNotRealtimeVille() {
    const db = getFirestore();
    const colRef = collection(db, 'villes');
    const q = query(colRef, orderBy('name', 'desc'), limit(100));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab = [];
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

  getWhoSaleMedicament2(medicamentId): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      let ville = this.random.getVilleRecherche();
      const db = getFirestore();
      const colRef = collection(db, 'companies');
      const q = query(
        colRef,
        where('allMedicamentListId', 'array-contains', medicamentId),
        where('ville', '==', ville)
      );
      getDocs(q).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        resolve(tab);
      });
    });
  }
  getAllNotRealtimeMedicament() {
    //  this.notif.presentLoading(25000);
    if (this.listRandom && this.listRandom.length) {
      // this.notif.dismissLoading();
      return this.medicamentList$;
    } else {
      const db = getFirestore();
      const colRef = collection(db, 'medicament');
      const q = query(colRef, orderBy('updateAt', 'desc'));
      getDocs(q).then((snapshot) => {
        let tab = [];
        snapshot.docs.forEach((doc) => {
          tab.push({ ...doc.data(), id: doc.id });
        });
        // this.notif.dismissLoading();
        this.medicamentList$.next(tab);
      });

      return this.medicamentList$;
    }
  }
}
