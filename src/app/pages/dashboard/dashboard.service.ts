// dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://localhost:7152/';
  private controllerPath="/build";
  constructor(private http: HttpClient) {}

  // CRUD işlemleri için metotlar
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl+this.controllerPath}`);
  }

  addNewItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl+this.controllerPath}`, item);
  }

  updateItem(itemId: number, updatedItem: any): Observable<any> {
    return this.http.put(`${this.apiUrl+this.controllerPath}/${itemId}`, updatedItem);
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl+this.controllerPath}/${itemId}`);
  }
}
