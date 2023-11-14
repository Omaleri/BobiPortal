import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildModel } from 'src/app/model/build.model';
import { BuildService } from 'src/app/services/build.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: BuildModel[]=[];
  public static selectedRow:any;
  /** Oluşturucu */
  constructor(private dashboardService: DashboardService, 
    private buildService:BuildService,
    private router:Router) {}

  /** Sayfa Yüklendiğinde Çalışacak methodlar */
  ngOnInit(): void {
    this.getBuildList();
  }

  getBuildList(): void {
    this.buildService.getListAsync().subscribe((data) => {
      this.dashboardData = data;
      console.log(data);
    });
  }

  /**
   * 
   * @param url Yönlendirilecek Sayfa Url
   */
  goToUrl(url:string, data:any) {
    console.log(url);
    DashboardComponent.selectedRow=data;
    this.router.navigateByUrl(url);
  }

}
