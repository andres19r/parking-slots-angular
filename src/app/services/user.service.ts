import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User, UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersRef = firestore.collection(this.dbPath);
  }

  getAllUsers(): Observable<User[]> {
    return this.usersRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        })),
      ),
    );
  }

  create(user: User): any {
    return this.usersRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }

  initUsersListener() {
    return this.firestore
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            const { firstName, lastName, email, ci, role } =
              snap.payload.doc.data() as any;
            return User.fromFirebase({
              uid: snap.payload.doc.id,
              firstName,
              lastName,
              email,
              ci,
              role,
            });
          }),
        ),
      );
  }
}
