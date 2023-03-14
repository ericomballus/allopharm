import { Injectable, NgZone } from '@angular/core';
import { Auth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Data, Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
//import * as firebase from 'firebase/app';

import {
  serverTimestamp,
  getDocs,
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { User } from '../modeles/user-model';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  utilisateur: any;
  auth: Auth = getAuth();
  user: any;
  private userRole = new BehaviorSubject([]);
  constructor(
    public router: Router,
    private ngZone: NgZone,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      onAuthStateChanged(this.auth, (user) => {
        console.log(user);

        this.user = user;
      });
    });
  }

  // Login in with email/password
  SignIn(email: string, password: string) {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  RegisterUser(email: string, password: string) {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, password);
  }
  // Email verification when new user register
  SendVerificationMail(UserCredential: firebase.auth.AuthCredential) {
    /* const auth= getAuth()
    auth..sendEmailVerification().then((res) => {
      console.log(res);

      this.router.navigate(['verify-email']);
    });*/
  }

  PasswordRecover(passwordResetEmail: string) {
    const auth = firebase.auth();
    return auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn() {
    // const user: firebase.User = JSON.parse(localStorage.getItem('user'));
    /*  return this.user !== null && this.user.emailVerified !== false
      ? true
      : false; */
    return this.user;
  }

  get isEmailVerified(): boolean {
    const db = firebase.firestore();
    //  db.collection("notifications").doc('hello').delete()
    // const user = JSON.parse(localStorage.getItem('user'));
    return this.user.emailVerified !== false ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    const auth = firebase.auth();
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async updateUserData(data: User) {
    const db = getFirestore();
    const colRef = doc(db, 'users', data.uid);
    let user = data;
    let telephone = '0000';
    let schedule: any[] = [];
    if (data.telephone) {
      telephone = data.telephone;
    }
    if (data.schedule) {
      schedule = data.schedule;
    }
    const userData = {
      uid: data.uid,
      email: data.email,
      name: data.name,
      photoURL: data.photoURL,
      emailVerified: data.emailVerified,
      lastLoginAt: serverTimestamp(),
      telephone: telephone,
      schedule: schedule,
    };
    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(colRef, userData);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  async StoreUserData(data: any) {
    const db = getFirestore();
    const colRef = collection(db, 'users');
    let adminId = '';
    console.log(data);

    let user = data;
    let telephone = '0000';
    let wallet = '0000';
    let visa = '0000';
    if (data.phone) {
      telephone = data.phone;
    }
    if (data.wallet) {
      wallet = data.wallet; /////
    }
    if (data.visa) {
      visa = data.visa;
    }
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      createdAt: serverTimestamp(),
      adminId: adminId,
      telephone: telephone,
      visa: visa,
      wallet: wallet,
      userName: data.userName,
    };
    console.log(userData);

    return new Promise(async (resolve, reject) => {
      try {
        await addDoc(colRef, data);
        resolve('ok');
      } catch (error) {
        reject(error);
      }
    });
  }

  // Sign-out
  SignOut() {
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then(() => {
          resolve('ok');
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  setUserRole(data: any[]) {
    // this.userRole.next(data);
  }
  getUserRole() {
    return this.userRole;
  }

  getUser(email: string): Promise<User> {
    const db = getFirestore();
    const colRef = collection(db, 'users');
    const q = query(colRef, where('email', '==', email));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          let tab: any = [];
          snapshot.docs.forEach((doc) => {
            tab.push({ ...doc.data(), id: doc.id });
          });
          resolve(tab[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
