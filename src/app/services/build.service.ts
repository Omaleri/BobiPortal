import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  constructor(private http: HttpClient) {}

  getProvinces(city: string): Observable<string[]> {
    // Şehre göre il bilgilerini getiren servis çağrısı (backend'e uygun şekilde güncellenmelidir)
    // Örnek bir çağrı:
    // return this.http.get<string[]>(`backend/api/provinces?city=${city}`);
    return this.http.get<string[]>('assets/provinces.json'); // Örnek veri kullanılıyor
  }

  getTowns(province: string): Observable<string[]> {
    // İl'e göre kasaba/şehir bilgilerini getiren servis çağrısı (backend'e uygun şekilde güncellenmelidir)
    // Örnek bir çağrı:
    // return this.http.get<string[]>(`backend/api/towns?province=${province}`);
    return this.http.get<string[]>('assets/towns.json'); // Örnek veri kullanılıyor
  }

  createProduct(product: any): Observable<any> {
    // Yeni ürün oluşturan servis çağrısı (backend'e uygun şekilde güncellenmelidir)
    // Örnek bir çağrı:
    // return this.http.post('backend/api/createProduct', product);
    return this.http.post('assets/createProduct.json', product); // Örnek veri kullanılıyor
  }
}
