import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, onValue } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
    private parkingPath = '/parking/slot';

  constructor(private db: AngularFireDatabase) { }

  getParkingSlots() {
    return this.db.object('sensores').valueChanges();
  }

  updateSlotAvailability(slotId: string, isAvailable: boolean) {
    return this.db.object(`sensores/${slotId}`).set(isAvailable ? 0 : 1);
  }

   getParkingState(callback: (state: number) => void) {
    const parkingRef = ref(this.db.database, this.parkingPath);
    onValue(
      parkingRef,
      (snapshot) => {
        const state = snapshot.val();
        callback(state);
      },
      (error) => {
        console.error('Error al leer el estado del LED: ', error);
        callback(0);
      }
    );
  }
}
