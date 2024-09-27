import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from '@firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, UserRole } from '../models/user';
import { map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthfireService {
  userSubscription$?: Subscription;
  private _user: User | null = null;

  get user() {
    return { ...this._user };
  }

  constructor(
    private readonly afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser) => {
      if (fbUser) {
        this.userSubscription$ = this.firestore
          .doc(`users/${fbUser.uid}`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = User.fromFirebase(firestoreUser);
            this._user = user;
          });
      } else {
        this._user = null;
        this.userSubscription$?.unsubscribe();
      }
    });
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    ci: number,
    role: UserRole,
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(
          user!.uid,
          firstName,
          lastName,
          ci,
          email,
          role,
        );
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

  isAuth() {
    return this.afAuth.authState.pipe(map((fUser) => fUser != null));
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
