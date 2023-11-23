import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BuildComponent } from './pages/add-build/add-build.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './pages/info/info.component';
import { AuthGuard } from './services/login.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-build', component: BuildComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'info/:id', component: InfoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
