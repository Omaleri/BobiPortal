import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { VoiceModel } from '../model/voice.model';
import { BuildModel } from '../model/build.model';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  /** Controller Adresi */
  private controllerPath='/voice'

  /**
   * Http Ayarları
   */
  httpOptions= { heraders:new HttpHeaders({
    'Content-Type':'application/json; charset=UTF-8'
  })};

  constructor(private httpClient:HttpClient, private globalService:GlobalService) { }

  getVoiceListAsync():Observable<VoiceModel> {
    return this.httpClient.get<VoiceModel>(this.globalService.baseUrl+ this.controllerPath+'/GetListAsync').pipe();
  }
}
