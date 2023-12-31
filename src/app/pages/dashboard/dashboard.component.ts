import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildModel } from 'src/app/model/build.model';
import { BuildService } from 'src/app/services/build.service';
import { AddressModel } from 'src/app/model/address.model';
import { CityService } from 'src/app/services/city.service';
import { VoiceService } from 'src/app/services/voice.service';
import { VoiceModel } from 'src/app/model/voice.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  voiceData: VoiceModel[]=[];
  cityData: AddressModel[]=[];
  dashboardData: BuildModel[]=[];
  public static selectedRow:any;

  /** Oluşturucu */
  constructor( private cityService:CityService,
    private buildService:BuildService,
    private router:Router,
    private voiceService:VoiceService) {}

  /** Sayfa Yüklendiğinde Çalışacak methodlar */
  ngOnInit(): void {
    
    this.getBuildList();
    this.getCityList();
    this.getVoice();
  }

  getBuildList(): void {
    this.buildService.getListAsync().subscribe((data) => {
      this.dashboardData = data;
      console.log(data);
    });
  }

  deleteBuild(buildId: string): void {
    this.buildService.deleteAsync(buildId).subscribe(
      (data) => {
        // Başarıyla silindiğinde yapılacak işlemler
        console.log('Build successfully deleted!', data);
        // Örneğin, güncellenmiş build listesini almak için buildService'den gerekli fonksiyonu çağırabilirsiniz.
        this.getBuildList();
      },
      (error) => {
        // Silme işlemi başarısız olduğunda yapılacak işlemler
        console.error('Error deleting build', error);
      }
    );
  }

  confirmDelete(id: string): void {
    const confirmation = confirm('Bu öğeyi silmek istediğinizden emin misiniz?');
  
    if (confirmation) {
      this.deleteBuild(id);
    }
  }

  getCityList(): void {
    this.cityService.getCityListAsync().subscribe((data) =>{
      this.cityData = data;
      console.log(data)
    })
  }
  
  getCityName(cityId: string): string {
    if (!this.cityData || this.cityData.length === 0) {
      return '';
    }
  
    const city = this.cityData.find(c => c.id === cityId);
    return city ? city.name : '';
  }

  getVoice(): void{
    this.voiceService.getVoiceListAsync().subscribe((data) =>{
      this.voiceData = data;
      console.log(data)
    })
  }

  /**
   * 
   * @param url Yönlendirilecek Sayfa Url
   */
  goToUrl(url:string, data:any) {
    console.log(url);
    DashboardComponent.selectedRow=data;
    this.router.navigateByUrl(`${url}/${data.id}`);
  }
}
