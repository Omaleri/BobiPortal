import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BuildComponent } from './pages/add-build/add-build.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'add-build',component:BuildComponent},
  {path:'login',component:LoginComponent},
  {path:'info',component:InfoComponent},
  { path: 'info/:id', component: InfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
