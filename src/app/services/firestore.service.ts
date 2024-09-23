import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createUser(newUser: User) {
    const { firstName, lastName, ci, email, password } = newUser;
    return this.firestore.collection('users').add({
      firstName,
      lastName,
      ci,
      email,
      password,
    });
  }
}
