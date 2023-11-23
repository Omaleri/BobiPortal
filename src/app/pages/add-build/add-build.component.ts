import { Component } from '@angular/core';
import { AddressModel } from 'src/app/model/address.model';
import { CityService } from 'src/app/services/city.service';
import { ProvinceService } from 'src/app/services/province.service';
import { TownService } from 'src/app/services/town.service';
import { StreetService } from 'src/app/services/street.service';
import { NumberService } from 'src/app/services/number.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildService } from 'src/app/services/build.service';
import { AdminAccessService } from 'src/app/services/adminAccess.service';
import { timestamp } from 'rxjs';


@Component({
  selector: 'add-build',
  templateUrl: './add-build.component.html',
  styleUrls: ['./add-build.component.css']
})
export class BuildComponent {
  
  cityData: AddressModel[]=[];
  provinceData: AddressModel[]=[];
  townData: AddressModel[]=[];
  streetData: AddressModel[]=[];
  numberData: AddressModel[]=[];
  buildForm!: FormGroup;

  constructor( private cityService:CityService,
    private provinceService:ProvinceService,
    private router:Router,
    private townService:TownService,
    private streetService:StreetService,
    private numberService:NumberService,
    private formBuilder: FormBuilder,
    private buildService:BuildService,
    private adminAccessService: AdminAccessService) {}

    ngOnInit() {
      if (!this.adminAccessService.hasAccessToBuildPage()) {
        // Eğer erişim izni yoksa, kullanıcıyı başka bir sayfaya yönlendir
        alert('Bu sayfaya erişim izniniz yok!');
        this.router.navigate(['/dashboard']);}
      this.getCityList();
      this.getProvinceList();
      this.getTownList();
      this.getStreetList();
      this.getNumberList();
      this.buildForm = this.formBuilder.group({
        city: ['', Validators.required],
        province: ['', Validators.required],
        town: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        numberOfFloors: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
        typeOfFeature: ['', Validators.required],
        device: ['', Validators.required],
        cityId: [''],
        provinceId: [''],
        townId: [''],
        streetId: [''],
        numberId: [''],
        situation: true,
        dateOfDestructive: "2023-11-20T00:14:21.610Z",
        id: ""
      });
    }

    getCityList(): void {
      this.cityService.getCityListAsync().subscribe((data) =>{
        this.cityData = data;
        console.log(data)
      })
    }

    getProvinceList(): void {
      this.provinceService.getProvinceListAsync().subscribe((data) =>{
        this.provinceData = data;
        console.log(data)
        this.provinceData = this.provinceData.filter(province => province.main === this.selectedCityName());
      })
    }
  
    getTownList(): void {
      this.townService.getTownListAsync().subscribe((data) =>{
        this.townData = data;
        console.log(data)
        this.townData = this.townData.filter(town => town.main === this.selectedProvinceName());
      })
    }
  
    getStreetList(): void {
      this.streetService.getStreetListAsync().subscribe((data) =>{
        this.streetData = data;
        console.log(data)
        this.streetData = this.streetData.filter(street => street.main === this.selectedTownName());
      })
    }
  
    getNumberList(): void {
      this.numberService.getNumberListAsync().subscribe((data) =>{
        this.numberData = data;
        console.log(data)
        this.numberData = this.numberData.filter(number => number.main === this.selectedStreetName());

      })
    }

    selectedCityName(): string {
      const cityControl = this.buildForm.get('city');
      return cityControl ? cityControl.value : '';
    }
  
    selectedProvinceName(): string {
      const provinceControl = this.buildForm.get('province');
      return provinceControl ? provinceControl.value : '';
    }
  
    selectedTownName(): string {
      const townControl = this.buildForm.get('town');
      return townControl ? townControl.value : '';
    }
  
    selectedStreetName(): string {
      const streetControl = this.buildForm.get('street');
      return streetControl ? streetControl.value : '';
    }
  
    onSubmit() {
      console.log(this.buildForm.value);
    }

    createBuild() {
      if (this.buildForm.valid) {
        const formData = this.buildForm.value;
      // cityId'yi ekleyerek HTTP isteği gönder
        const requestModel = {
      // Diğer form verilerini buraya eklseyin
        cityId: formData.cityId,
        provinceId: formData.provinceId,
        townId: formData.townId,
        streetId: formData.streetId,
        numberId: formData.numberId,
        numberOfFloors: formData.numberOfFloors,
        typeOfFeature: formData.typeOfFeature,
        situation: true,
        dateOfDestructive: "2023-11-20T00:14:21.610Z",
        id: ""
        
      // Diğer form alanlarını da buraya ekleyin
        };

        const deviceInfo = {
          id: "string",
          deviceName: this.buildForm.get('device')?.value
        };
        console.log(deviceInfo)

      // Ana istek içinde Device bilgisini ekleyin
        const requestWithDevice = {
          ...requestModel,
          device: [deviceInfo]
        };
        console.log(requestWithDevice),


        this.buildService.createBuildAsync(requestWithDevice).subscribe(response => {
          console.log('Build created successfully:', response);
        }, error => {
          console.error('Error creating neighborhood:', error);
        });
      }
    }

    loadCity() {
      this.provinceData = [];
      this.townData = [];
      this.streetData = [];
      this.numberData = [];
      const selectedCity = this.buildForm.get('city')?.value;
    
      if (selectedCity) {
        // Seçili şehrin ID'sini alarak form kontrolünü güncelle
        const selectedCityId = this.cityData.find(city => city.name === selectedCity)?.id;
        this.buildForm.get('cityId')?.setValue(selectedCityId);
      }
    }
    

    loadProvinces() {
      this.townData = [];
      this.streetData = [];
      this.numberData = [];
      const selectedProvince = this.buildForm.get('province')?.value;
    
      if (selectedProvince) {
        // Seçili şehrin ID'sini alarak form kontrolünü güncelle
        const selectedProvinceId = this.provinceData.find(province => province.name === selectedProvince)?.id;
        this.buildForm.get('provinceId')?.setValue(selectedProvinceId);
      }
    }
    
    loadTowns() {
      this.streetData = [];
      this.numberData = [];
      const selectedTown = this.buildForm.get('town')?.value;
    
      if (selectedTown) {
        // Seçili şehrin ID'sini alarak form kontrolünü güncelle
        const selectedTownId = this.townData.find(town => town.name === selectedTown)?.id;
        this.buildForm.get('townId')?.setValue(selectedTownId);
      }
    }
    loadStreets() {
      this.numberData = [];
      const selectedStreet = this.buildForm.get('street')?.value;
    
      if (selectedStreet) {
        // Seçili şehrin ID'sini alarak form kontrolünü güncelle
        const selectedStreetId = this.streetData.find(street => street.name === selectedStreet)?.id;
        this.buildForm.get('streetId')?.setValue(selectedStreetId);
      }
    }
    loadNumber() {
      const selectedNumber = this.buildForm.get('number')?.value;
    
      if (selectedNumber) {
        // Seçili şehrin ID'sini alarak form kontrolünü güncelle
        const selectedNumberId = this.numberData.find(number => number.name === selectedNumber)?.id;
        this.buildForm.get('numberId')?.setValue(selectedNumberId);
      }
    }
    
    
}
