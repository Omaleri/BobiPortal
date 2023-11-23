import { VoiceModel } from "./voice.model";

/** Build Modeli */
export class BuildModel{

     id:string='';
     cityId:string ='';
     provinceId:string='';
     townId:string='';
     streetId:string='';
     numberId:string='';
     situation ?:boolean ;
    numberOfFloors?:number ;
     typeOfFeature ?:string ;
     dateOfDestructive?:Date ;
     device:string='';
}