import { Component } from '@angular/core';
import { AddressModel } from 'src/app/model/address.model';
import { CityService } from 'src/app/services/city.service';
import { ProvinceService } from 'src/app/services/province.service';
import { TownService } from 'src/app/services/town.service';
import { StreetService } from 'src/app/services/street.service';
import { NumberService } from 'src/app/services/number.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  neighborhoodForm!: FormGroup;

  constructor( private cityService:CityService,
    private provinceService:ProvinceService,
    private router:Router,
    private townService:TownService,
    private streetService:StreetService,
    private numberService:NumberService,
    private formBuilder: FormBuilder) {}

    ngOnInit() {
      this.getCityList();
      this.getProvinceList();
      this.getTownList();
      this.getStreetList();
      this.getNumberList();
      this.neighborhoodForm = this.formBuilder.group({
        city: ['', Validators.required],
        province: ['', Validators.required],
        town: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required]
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
      const cityControl = this.neighborhoodForm.get('city');
      return cityControl ? cityControl.value : '';
    }
  
    selectedProvinceName(): string {
      const provinceControl = this.neighborhoodForm.get('province');
      return provinceControl ? provinceControl.value : '';
    }
  
    selectedTownName(): string {
      const townControl = this.neighborhoodForm.get('town');
      return townControl ? townControl.value : '';
    }
  
    selectedStreetName(): string {
      const streetControl = this.neighborhoodForm.get('street');
      return streetControl ? streetControl.value : '';
    }
  
    onSubmit() {
      console.log(this.neighborhoodForm.value);
    }
}
