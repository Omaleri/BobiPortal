// info.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BuildService } from 'src/app/services/build.service';
import { AddressModel } from 'src/app/model/address.model';
import { CityService } from 'src/app/services/city.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ProvinceService } from 'src/app/services/province.service';
import { TownService } from 'src/app/services/town.service';
import { StreetService } from 'src/app/services/street.service';
import { NumberService } from 'src/app/services/number.service';
import { VoiceModel } from 'src/app/model/voice.model';
import { VoiceService } from 'src/app/services/voice.service';
import { BuildModel } from 'src/app/model/build.model';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceModel } from 'src/app/model/device.model'
import { AdminAccessService } from 'src/app/services/adminAccess.service';
import { forkJoin } from 'rxjs';


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
  buildInfoData: any;
  newDeviceName: string='';
  deviceId: string='';
  isAdmin: boolean = false;

  editMode = false;
  selectedRow:any;

  showVoiceListFlag: boolean = false; // Voice List'in görünürlüğünü kontrol etmek için bayrak

  constructor(private adminAccessService:AdminAccessService,
     private cityService:CityService,
    private buildService:BuildService,
    private router:Router,
    private provinceService:ProvinceService,
    private townService:TownService,
    private streetService:StreetService,
    private numberService:NumberService,
    private voiceService:VoiceService,
    private deviceService:DeviceService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.getCityList();
    this.getProvinceList();
    this.getTownList();
    this.getStreetList();
    this.getNumberList();
    this.getVoice();
    this.getBuildList();
    this.isAdmin = this.adminAccessService.hasAdminAccess();
    console.log(DashboardComponent.selectedRow);
    this.selectedRow = DashboardComponent.selectedRow;

    this.activatedRoute.paramMap.subscribe(params => {
      const buildId = params.get('id');

      if (buildId) {
        this.buildService.getByIdAsync(buildId).subscribe(
          data => {
            this.buildInfoData = data;
            console.log('Build Data:', this.buildInfoData);
          },
          error => {
            console.error('Error getting build data:', error);
          }
        );
      } else {
        console.error('No buildId found in the URL.');
      }
    });
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
        if (voice.buildId === this.buildInfoData.id) {
          const connectedVoice: VoiceModel = {
            id: voice.id,
            buildId: voice.buildId,
            link: voice.link,
            voiceDate: voice.voiceDate
          };
          console.log("voice alındı")
          this.connectedVoiceData.push(connectedVoice);
        }
      }
    }

    deleteBuild(buildId: string): void {
      this.buildService.deleteAsync(buildId).subscribe(
        (data) => {
          console.log('Build successfully deleted!', data);
          this.getBuildList();
          this.router.navigate(['/dashboard']);
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
      const device = this.buildInfoData.Device
      this.buildService.updateForDeviceAsync( this.buildInfoData.Id, this.buildInfoData.device,this.buildInfoData.CityId,this.buildInfoData.NumberId,this.buildInfoData.ProvinceId,this.buildInfoData.StreetId,this.buildInfoData.TownId,this.buildInfoData.TypeOfFeature).subscribe(
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
// ...

/*deleteAndThenUpdate(deviceId: string, id: string) {
  // deleteDeviceAsync ve updateAsync'i aynı anda çalıştır
  forkJoin([
    this.deviceService.deleteDeviceAsync(deviceId),
    this.buildService.updateAsync(id) // Burada güncellenecek verileri sağlayın
  ]).subscribe(
    ([deleteResult, updateResult]) => {
      // İki işlem de başarılıysa
      console.log('Device deleted successfully:', deleteResult);
      console.log('Device updated successfully:', updateResult);
      // Burada gerekirse this.deviceData veya başka bir şeyi güncelleyebilirsiniz.
    },
    (error) => {
      // Herhangi bir işlemde hata durumunda
      console.error('Error:', error);
    }
  );
}*/


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
