// info.component.ts

import { Component, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  address: any;
  typeOfFeatures!: string;
  numberOfFloors!: number;
  voiceVolume!: number;
  devices!: any[]; // Devices listesi
  showVoiceListFlag: boolean = false; // Voice List'in görünürlüğünü kontrol etmek için bayrak
  voiceList: any[] = [
    { name: 'Voice 1', date: '2023-11-10' },
    { name: 'Voice 2', date: '2023-11-11' },
    // Daha fazla örnek voice ekleyebilirsiniz.
  ]; // Voice Listesi

  fullAddress: string = '';

  ngOnInit() {
    // Address içeriğini birleştirerek fullAddress'e ata
    // this.fullAddress = `${this.address.city} - ${this.address.province} - ${this.address.town} - ${this.address.street} - ${this.address.number} - ${this.address.openAddress || ''}`;
    console.log(DashboardComponent.selectedRow);
    this.devices=DashboardComponent.selectedRow;
  }

  toggleVoiceList() {
    // Voice List'i açma/kapatma işlemi
    this.showVoiceListFlag = !this.showVoiceListFlag;
  }
}
