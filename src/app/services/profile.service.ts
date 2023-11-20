import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private firestore: Firestore) {}

  async getProfile(uid: string) {
    const snapShot = await getDoc(doc(this.firestore, 'users', uid));
    const profile = {
      ...snapShot.data(),
      id: uid,
    };
    return profile;
  }

  async updateProfile(uid: string, { name, age, phoneCode, phone }: any) {
    const docRef = doc(this.firestore, 'users', uid);
    const data = {
      name: name,
      age: age,
      phone: phoneCode + ' ' + phone,
    };
    return updateDoc(docRef, data);
  }
}
