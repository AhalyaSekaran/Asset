import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssetNameDTO } from '../dto/assetNameDto';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {
  baseUrl!:string;
  constructor(private http:HttpClient) { 
    this.baseUrl=environment.baseUrl;
  }

  addAssetName(assetName: AssetNameDTO):Observable<any> {
   return this.http.post(`${this.baseUrl}/assetname/save`,assetName);
  }

}
