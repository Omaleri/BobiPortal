// admin-access.service.ts

import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessService {

  constructor(private localStorageService: LocalStorageService) {}

  hasAdminAccess(): boolean {
    const userData = this.localStorageService.getItem('userData');

    // Kullanıcı varsa ve isAdmin değeri true ise, erişim izni ver
    return userData && userData.isAdmin === true;
  }

  hasAccessToBuildPage(): boolean {
    // /add-build sayfasına erişim izni kontrolü
    return this.hasAdminAccess(); // Sadece admin olan kullanıcılar erişebilir
  }

  hasAccessToInfoPage(): boolean {
    // /info sayfasına erişim izni kontrolü
    // Bu örnekte, özel bir izin mantığı ekleyebilirsiniz
    // Örneğin, userAdmin === true ve belirli bir koşulu sağlıyorsa izin ver
    const userData = this.localStorageService.getItem('userData');
    return userData && userData.userAdmin === true  /* başka bir koşul */
  };
}
