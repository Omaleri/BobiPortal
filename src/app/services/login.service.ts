import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   /** Controller Adresi */
   private controllerPath='/user'

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
   getUserListAsync():Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }
}