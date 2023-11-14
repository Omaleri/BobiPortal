import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { BuildModel } from '../model/build.model';

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
 
}
