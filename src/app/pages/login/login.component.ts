// login.component.ts

import { Component } from '@angular/core';
import  { LoginService } from 'src/app/services/login.service'
import { UserModel } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData: UserModel[]=[];

  constructor( private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService) {}

  showPassword: boolean = false;

  ngOnInit() {
    this.getUserList();
    };

  email: string = '';
  password: string = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword)
  }
  
  login() {
    const user = this.userData.find(u => u.email === this.email);
    if (!user) {
      console.log('Kullanıcı bulunamadı');
      return;
    }    if (user && user.password === this.password) {
      console.log('Giriş başarılı');
      const login = alert('Giriş başarılı');

      this.localStorageService.setItem('userData', user);
      this.router.navigate(['/dashboard']);
      // İstediğiniz yönlendirmeyi veya işlemi buraya ekleyin.
    } else {
      console.log('Kullanıcı adı veya şifre hatalı');
    }
  }

  getUserList(): void {
    this.loginService.getUserListAsync().subscribe((data) =>{
      this.userData = data;
      console.log(data)
    })
  }
}
