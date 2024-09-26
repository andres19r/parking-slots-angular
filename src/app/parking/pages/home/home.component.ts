import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../../services/parking.service';

interface ParkingSlot {
  position: number;
  available: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  parkingSlots: ParkingSlot[] = [];
  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.parkingService.getParkingSlots().subscribe((slots: any) => {
      this.parkingSlots = slots;
    });
  }
}
