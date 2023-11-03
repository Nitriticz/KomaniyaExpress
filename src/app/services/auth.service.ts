import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register({ email, password, name, age, phoneCode, phone }: any) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const userData = {
        email: email,
        name: name,
        age: age,
        phone: phoneCode + ' ' + phone,
      };
      setDoc(doc(this.firestore, 'users', user.user.uid), userData);
      return user;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        console.log(e);

        return e;
      }
      return null;
    }
  }

  async login({ email, password }: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        return e;
      }
      return null;
    }
  }

  async logOut() {
    return await signOut(this.auth);
  }
}
