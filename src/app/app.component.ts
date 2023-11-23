import { Component, ElementRef, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router,private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}
  title = 'BobiFrontend';

  logout(): void {
    this.localStorageService.removeItem('userData');
    const login = alert('Çıkış başarılı');
    this.router.navigate(['/login']);
    console.log('çıkış yapıldı')
  }
  
  isLoggedIn(): boolean {
    // Kullanıcının giriş yapmış olup olmadığını kontrol et
    return !!this.localStorageService.getItem('userData');
  }
}
