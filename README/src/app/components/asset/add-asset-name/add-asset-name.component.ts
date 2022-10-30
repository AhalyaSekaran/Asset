import { MatDialogRef } from '@angular/material/dialog';
import { AssetNameDTO } from './../../../dto/assetNameDto';
import { Component, OnInit } from '@angular/core';
import { AllServiceService } from 'src/app/services/all-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-asset-name',
  templateUrl: './add-asset-name.component.html',
  styleUrls: ['./add-asset-name.component.css']
})
export class AddAssetNameComponent implements OnInit {
  assetName:AssetNameDTO=new AssetNameDTO();
  constructor(private service:AllServiceService,private toast:NgToastService,private dialogRef:MatDialogRef<AddAssetNameComponent>) { }

  ngOnInit(): void {
  }
  addAssetName(){

    this.service.addAssetName(this.assetName).subscribe(
      (data)=>{
        this.assetName=data
        this.toast.success({detail:"Success",duration:3000,summary:"Asset Name Added SuccessFully"});
        this.dialogRef.close()
      }
    );
  }

}
