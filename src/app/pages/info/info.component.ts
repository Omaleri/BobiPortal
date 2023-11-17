// info.component.ts

import { Component, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BuildService } from 'src/app/services/build.service';
import { AddressModel } from 'src/app/model/address.model';
import { CityService } from 'src/app/services/city.service';
import { Router } from '@angular/router';
import { ProvinceService } from 'src/app/services/province.service';
import { TownService } from 'src/app/services/town.service';
import { StreetService } from 'src/app/services/street.service';
import { NumberService } from 'src/app/services/number.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  cityData: AddressModel[]=[];
  provinceData: AddressModel[]=[];
  townData: AddressModel[]=[];
  streetData: AddressModel[]=[];
  numberData: AddressModel[]=[];

  selectedRow:any;
  fullAddress:any;
  showVoiceListFlag: boolean = false; // Voice List'in görünürlüğünü kontrol etmek için bayrak
  voiceList: any[] = [
    { name: 'Voice 1', date: '2023-11-10' },
    { name: 'Voice 2', date: '2023-11-11' },
    // Daha fazla örnek voice ekleyebilirsiniz.
  ]; // Voice Listesi

  constructor( private cityService:CityService,
    private buildService:BuildService,
    private router:Router,
    private provinceService:ProvinceService,
    private townService:TownService,
    private streetService:StreetService,
    private numberService:NumberService) {}

  ngOnInit() {
    this.getCityList();
    this.getProvinceList();
    this.getTownList();
    this.getStreetList();
    this.getNumberList();
    console.log(DashboardComponent.selectedRow);
    this.selectedRow = DashboardComponent.selectedRow;
    this.fullAddress = `${this.getCityName(this.selectedRow.cityId)} - ${this.getProvinceName(this.selectedRow.provinceIdId)} - ${this.getTownName(this.selectedRow.townId)}
     - ${this.getStreetName(this.selectedRow.streetId)} - ${this.getNumberName(this.selectedRow.numberId)}`;
  }

  getCityList(): void {
    this.cityService.getCityListAsync().subscribe((data) =>{
      this.cityData = data;
      console.log(data)
    })
  }
  getCityName(cityId: string): string {
    if (!this.cityData || this.cityData.length === 0) {
      return '';
    }
  
    const city = this.cityData.find(c => c.id === cityId);
    return city ? city.name : '';
  }

  getProvinceList(): void {
    this.provinceService.getProvinceListAsync().subscribe((data) =>{
      this.provinceData = data;
      console.log(data)
    })
  }
  getProvinceName(provinceId: string): string {
    if (!this.provinceData || this.provinceData.length === 0) {
      return '';
    }
  
    const province = this.provinceData.find(c => c.id === provinceId);
    return province ? province.name : '';
  }

  getTownList(): void {
    this.townService.getTownListAsync().subscribe((data) =>{
      this.townData = data;
      console.log(data)
    })
  }
  getTownName(townId: string): string {
    if (!this.townData || this.townData.length === 0) {
      return '';
    }
  
    const town = this.townData.find(c => c.id === townId);
    return town ? town.name : '';
  }

  getStreetList(): void {
    this.streetService.getStreetListAsync().subscribe((data) =>{
      this.streetData = data;
      console.log(data)
    })
  }
  getStreetName(streetId: string): string {
    if (!this.streetData || this.streetData.length === 0) {
      return '';
    }
  
    const street = this.streetData.find(c => c.id === streetId);
    return street ? street.name : '';
  }

  getNumberList(): void {
    this.numberService.getNumberListAsync().subscribe((data) =>{
      this.numberData = data;
      console.log(data)
    })
  }
  getNumberName(numberId: string): string {
    if (!this.numberData || this.numberData.length === 0) {
      return '';
    }
  
    const number = this.numberData.find(c => c.id === numberId);
    return number ? number.name : '';
  }

  getAddress(): void {
    this.fullAddress = `${this.getCityName} - ${this.getProvinceName} - ${this.getTownName} - ${this.getStreetName} - ${this.getNumberName}`;
  };

  toggleVoiceList() {
    // Voice List'i açma/kapatma işlemi
    this.showVoiceListFlag = !this.showVoiceListFlag;
  }
}
