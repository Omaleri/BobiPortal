import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  /** Controller Adresi */
  private controllerPath='/device'

  /**
   * Http Ayarları
   */
  httpOptions= { heraders:new HttpHeaders({
    'Content-Type':'application/json; charset=UTF-8'
  })};

  constructor(private httpClient:HttpClient, private globalService:GlobalService) { }

  /**
   * Bütün device tablosundaki verileri getirir.
   * @return {any} Dönüş Değeri
   */
  getList():Observable<any> {
    return this.httpClient.get<any>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }
}
