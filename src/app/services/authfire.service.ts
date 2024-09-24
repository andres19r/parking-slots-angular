import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from '@firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthfireService {
  constructor(
    private readonly afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  register(email: string, password: string, firstName: string, lastName: string, ci: number, role: UserRole) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, firstName, lastName, ci, email, role);
        return this.firestore.doc(`users/${user!.uid}`).set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        const uid = credentials.user?.uid;
        return this.firestore.collection('users').doc(uid).get();
      });
  }

  logout() {
    return this.afAuth.signOut();
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  loginWithFacebook() {
    return this.afAuth.signInWithPopup(new FacebookAuthProvider());
  }

  loginWithX() {
    return this.afAuth.signInWithPopup(new TwitterAuthProvider());
  }
}
