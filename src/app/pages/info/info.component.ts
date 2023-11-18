// info.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BuildService } from 'src/app/services/build.service';
import { AddressModel } from 'src/app/model/address.model';
import { CityService } from 'src/app/services/city.service';
import { Router } from '@angular/router';
import { ProvinceService } from 'src/app/services/province.service';
import { TownService } from 'src/app/services/town.service';
import { StreetService } from 'src/app/services/street.service';
import { NumberService } from 'src/app/services/number.service';
import { VoiceModel } from 'src/app/model/voice.model';
import { VoiceService } from 'src/app/services/voice.service';
import { BuildModel } from 'src/app/model/build.model';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceModel } from 'src/app/model/device.model'


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{

  deviceData: DeviceModel[]=[];
  cityData: AddressModel[]=[];
  provinceData: AddressModel[]=[];
  townData: AddressModel[]=[];
  streetData: AddressModel[]=[];
  numberData: AddressModel[]=[];
  voiceData: VoiceModel[]=[];
  connectedVoiceData: VoiceModel[]=[];
  buildData: BuildModel[]=[];
  newDeviceName: string='';

  editMode = false;
  selectedRow:any;

  showVoiceListFlag: boolean = false; // Voice List'in görünürlüğünü kontrol etmek için bayrak

  constructor( private cityService:CityService,
    private buildService:BuildService,
    private router:Router,
    private provinceService:ProvinceService,
    private townService:TownService,
    private streetService:StreetService,
    private numberService:NumberService,
    private voiceService:VoiceService,
    private deviceService:DeviceService,) {}

  ngOnInit() {
    this.getCityList();
    this.getProvinceList();
    this.getTownList();
    this.getStreetList();
    this.getNumberList();
    this.connectVoiceAndBuild();
    this.getVoice();
    this.getBuildList();
    console.log(DashboardComponent.selectedRow);
    this.selectedRow = DashboardComponent.selectedRow;
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

  getVoice(): void{
    this.voiceService.getVoiceListAsync().subscribe((data) =>{
      this.voiceData = data;
      console.log(data)

      this.connectVoiceAndBuild();
    })
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

  getFormattedDevices(): string {
    if (!this.selectedRow || !this.selectedRow.device) {
      return '';
    }
  
    return this.selectedRow.device.map((device: { deviceName: any; id: any; }) => `Name: ${device.deviceName}      -       Id: ${device.id}`).join('     -     ');
  }

  getBuildList(): void {
    this.buildService.getListAsync().subscribe((data) => {
      this.buildData = data;
      console.log(data);
    });
  }

  connectVoiceAndBuild(): void {
    for (const voice of this.voiceData) {
        if (voice.buildId === this.selectedRow.id) {
          const connectedVoice: VoiceModel = {
            id: voice.id,
            buildId: voice.buildId,
            link: voice.link,
            voiceDate: voice.voiceDate
          };
          this.connectedVoiceData.push(connectedVoice);
        }
      }
    }

    deleteBuild(buildId: string): void {
      this.buildService.deleteAsync(buildId).subscribe(
        (data) => {
          console.log('Build successfully deleted!', data);
          this.getBuildList();
        },
        (error) => {
          console.error('Error deleting build', error);
        }
      );
    }
  
    createDevice(): void {
      if (this.newDeviceName === '') {
        console.error("Device name cannot be empty.");
        return;
      }
      this.deviceService.createDeviceAsync(this.newDeviceName, 'null').subscribe(
        (createdDevice) => {
          console.log("Device created successfully.", createdDevice);
          const createdDeviceId = createdDevice.id; // createdDevice içindeki ID
        },
        (error) => {
          console.error("Error creating device:", error);
        }
      );
      this.editMode = false;
    }

    addDevice(): void{
      this.buildService.updateAsync(this.selectedRow.id,this.newDeviceName).subscribe(
      (createdDevice) => {
        console.log("Build update successfully.", createdDevice);
        const createdDeviceId = createdDevice.id; // createdDevice içindeki ID
      },
      (error) => {
        console.error("Error updating build:", error);
      }
      )
    this.editMode = false;
    }


    confirmDelete(id: string): void {
      const confirmation = confirm('Bu öğeyi silmek istediğinizden emin misiniz?');
    
      if (confirmation) {
        this.deleteBuild(id);
      }
    }

    deleteDevice(deviceId: string) {
      this.deviceService.deleteDeviceAsync(deviceId).subscribe(
        (data) => {
          // İşlem başarılıysa
          console.log("Device deleted successfully:", data);
          // Burada gerekirse this.deviceData veya başka bir şeyi güncelleyebilirsiniz.
        },
        (error) => {
          // Hata durumunda
          console.error("Error deleting device:", error);
        }
      );
    }

    cancelEdit(){
      this.editMode = false;
      this.newDeviceName= '';
    }

    toggleEditMode() {
      this.editMode = !this.editMode;
    }

  toggleVoiceList() {
    // Voice List'i açma/kapatma işlemi
    this.showVoiceListFlag = !this.showVoiceListFlag;
  }
}
