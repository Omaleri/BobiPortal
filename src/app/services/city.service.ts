import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { AddressModel } from '../model/address.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
   /** Controller Adresi */
   private controllerPath='/city'

   /**
    * Http Ayarları
    */
   httpOptions= { heraders:new HttpHeaders({
     'Content-Type':'application/json; charset=UTF-8'
   })};
  constructor( private globalService:GlobalService,private httpClient: HttpClient) {}

  /**
   * Bütün device tablosundaki verileri getirir.
   * @return {any} Dönüş Değeri
   */
   getCityListAsync():Observable<AddressModel[]> {
    return this.httpClient.get<AddressModel[]>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }
}
