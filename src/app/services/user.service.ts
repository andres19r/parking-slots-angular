import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { User, UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  initUsersListener() {
    return this.firestore
      .collection('users')
      .snapshotChanges()
      .pipe(
      map((snaps) =>
        snaps.map((snap) => {
          const {firstName, lastName, email, ci, role} = snap.payload.doc.data() as any
          return User.fromFirebase({
            uid: snap.payload.doc.id,
            firstName,
            lastName,
            email,
            ci,
            role,
          }
          )
        }),
      ),
    );
  }
}
