import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { AddressModel } from '../model/address.model';

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
  getDeviceList():Observable<any> {
    return this.httpClient.get<any>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }

  createDeviceAsync(DeviceName: string, Id: string): Observable<any> {
    const apiUrl = `${this.globalService.baseUrl}${this.controllerPath}/CreateAsync`;
    const requestBody = { DeviceName: DeviceName, Id: 'null' };

    return this.httpClient.post<any>(apiUrl, requestBody);
  }

  deleteDeviceAsync(id: string): Observable<AddressModel[]> {
    const url = `${this.globalService.baseUrl}${this.controllerPath}/Delete/${id}`;
    return this.httpClient.delete<AddressModel[]>(url);
  }
  }

