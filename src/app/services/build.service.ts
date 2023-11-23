import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { BuildModel } from '../model/build.model';
import { BuildComponent } from '../pages/add-build/add-build.component'
import { DeviceModel } from '../model/device.model';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
   /** Controller Adresi */
   private controllerPath='/build'

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
   getListAsync():Observable<BuildModel[]> {
    return this.httpClient.get<BuildModel[]>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }

  getByIdAsync(id:string):Observable<BuildModel>{
    const url = `${this.globalService.baseUrl}${this.controllerPath}/GetById/${id}`;
    return this.httpClient.get<BuildModel>(url);
  }
 

  deleteAsync(id: string): Observable<BuildModel> {
    const url = `${this.globalService.baseUrl}${this.controllerPath}/Delete/${id}`;
    return this.httpClient.delete<BuildModel>(url);
  }
 
  createBuildAsync(requestWithDevice: any): Observable<any> {
    const url = `${this.globalService.baseUrl}${this.controllerPath}/CreateBuild`;
    return this.httpClient.post(url, requestWithDevice);
  }

  updateForDeviceAsync(Id: string, device: DeviceModel, CityId:string, NumberId:string,ProvinceId:string,StreetId:string,TownId:string,TypeOfFeature:string): Observable<BuildModel> {
    const requestBody = { Id, device,CityId,NumberId,ProvinceId,StreetId,TownId,TypeOfFeature};

    return this.httpClient.put<BuildModel>(
      `${this.globalService.baseUrl}${this.controllerPath}/UpdateAsync`,
      requestBody
    );
  }
}