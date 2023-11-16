import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { BuildModel } from '../model/build.model';
import { CityModel } from '../model/city.model';

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
   getCityListAsync():Observable<CityModel[]> {
    return this.httpClient.get<CityModel[]>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }
}
