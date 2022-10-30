import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AssetService } from 'src/app/services/asset.service';
import { assetsDTO } from 'src/app/dto/assetsDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogedInUser } from 'src/app/dto/LogedInUser';
import { AssetNameDTO } from 'src/app/dto/assetNameDto';
import { AllServiceService } from 'src/app/services/all-service.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  newAssetGroup: any;
  adminDetails:LogedInUser= new LogedInUser();
  newAsset:assetsDTO=new assetsDTO();
  assetNames!:AssetNameDTO[];
  constructor(private assetService:AssetService,private toast:NgToastService,private router:Router,private dialogRef:MatDialogRef<AddAssetComponent>) { }

  asset:assetsDTO=new assetsDTO();
  ngOnInit() {
    this.assetService.getAssetNameList().subscribe((data)=>this.assetNames=data);
    this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')

    this.newAssetGroup = new FormGroup({
      "assetName": new FormControl(null, [Validators.required]),
      "serialNumber": new FormControl(null, [Validators.required]),
      "location": new FormControl(null, [Validators.required]),
      "purchaseDate": new FormControl(null, [Validators.required]),
      "warrantyDate":new FormControl(null,[Validators.required,]),
      "modelName":new FormControl(null,[Validators.required,]),

      
    })
  }
  get assetName() { return this.newAssetGroup.get('assetName'); }
  get serialNumber() { return this.newAssetGroup.get('serialNumber'); }
  get location() { return this.newAssetGroup.get('location'); }
  get purchaseDate() { return this.newAssetGroup.get('purchaseDate'); }
  get warrantyDate() { return this.newAssetGroup.get('warrantyDate'); }
  get modelName() { return this.newAssetGroup.get('modelName'); }

  submitted = false;


 
  addAsset()
  {
    this.submitted=true;
    if(this.newAssetGroup.valid){
      this.newAsset.addedBy=this.adminDetails.adminName;
      
      this.assetService.saveAssets(this.newAsset).subscribe(data=>{
        this.toast.success({detail:"Success",duration:3000,summary:"Asset Added SuccessFully"});
        this.dialogRef.close();
        this.dialogRef.afterClosed().subscribe(item=>{
          this.reloadCurrentRoute();
        })
      },error=>{
        this.toast.error({detail:"Oops",duration:3000,summary:"Failed to added Asset"});
      })
    }
    else{
      return this.newAssetGroup;
    }
  }


  
  /* To Reload the Current Component */
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
