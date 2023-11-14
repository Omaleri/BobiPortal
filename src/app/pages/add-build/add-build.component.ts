import { Component } from '@angular/core';

interface AddressItem {
  name: string;
  provinces: ProvinceItem[];
}

interface ProvinceItem {
  name: string;
  towns: TownItem[];
}

interface TownItem {
  name: string;
  streets: StreetItem[];
}

interface StreetItem {
  name: string;
  numbers: string[];
}

@Component({
  selector: 'add-build',
  templateUrl: './add-build.component.html',
  styleUrls: ['./add-build.component.css']
})
export class BuildComponent {
  cities: AddressItem[] = [
    {
      name: 'Kocaeli',
      provinces: [
        {
          name: 'Izmit',
          towns: [
            {
              name: 'Merkez',
              streets: [
                {
                  name: 'Ataturk',
                  numbers: ['1', '2', '3']
                },
                {
                  name: 'Cumhuriyet',
                  numbers: ['10', '11', '12']
                }
              ]
            },
            {
              name: 'Gebze',
              streets: [
                {
                  name: 'Sokak1',
                  numbers: ['21', '22', '23']
                },
                {
                  name: 'Sokak2',
                  numbers: ['30', '31', '32']
                }
              ]
            }
          ]
        },
        // Diğer iller 
      ]
    },
    // Diğer ilçeler
  ];

  selectedCity: AddressItem | null = null;
  selectedProvince: ProvinceItem | null = null;
  selectedTown: TownItem | null = null;
  selectedStreet: StreetItem | null = null;
  selectedNumber: string | null = null;

  openAddress: string = '';

  numberOfFloors: number = 0;
  typeOfFeatures: string = '';

  devices: string[] = ['', ''];

  provinces: ProvinceItem[] = [];
  onCityChange() {
    this.selectedProvince = null;
    this.selectedTown = null;
    this.selectedStreet = null;
    this.selectedNumber = null;

    if (this.selectedCity) {
      this.provinces = this.selectedCity.provinces;
    } else {
      this.provinces = [];
    }
  }
  save() {
    console.log('Kaydedildi!');
    console.log('Seçili Şehir:', this.selectedCity);
    console.log('Seçili İl:', this.selectedProvince);
    console.log('Seçili Mahalle:', this.selectedTown);
    console.log('Seçili Sokak:', this.selectedStreet);
    console.log('Seçili Numara:', this.selectedNumber);
    console.log('Açık Adres:', this.openAddress);
    console.log('Kat Sayısı:', this.numberOfFloors);
    console.log('Özellik Türü:', this.typeOfFeatures);
    console.log('Cihazlar:', this.devices);
  }
}
