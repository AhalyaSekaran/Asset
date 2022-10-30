import { NgToastService } from 'ng-angular-popup';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { assetsDTO } from '../../../dto/assetsDTO';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AddAssetComponent } from '../../assets/add-asset/add-asset.component';
import { UpdateAssetComponent } from '../update-asset/update-asset.component';
import { ViewAssetComponent } from '../view-asset/view-asset.component';

@Component({
  selector: 'app-list-asset',
  templateUrl: './list-asset.component.html',
  styleUrls: ['./list-asset.component.css']
})
export class ListAssetComponent implements OnInit {
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;



  constructor(private assetService:AssetService,private router:Router,private dialog:MatDialog,private toast:NgToastService) { }
  listOfAssets!:assetsDTO[];


  ngOnInit() {
    this.assetService.getAssets()
      .subscribe((data) => {
        this.listOfAssets = data;
        //console.table(data)
      })


  }

  returnAsset(serialNumber:string,empId:string){
    if(confirm("Are you sure, Do you want to add this asset into return"))
    {
      this.assetService.returnAsset(serialNumber,empId).subscribe(data=>{
       this.reloadComponent();

      },error=>{
        this.reloadComponent();
      });
    }
  }

  addAsset()
  {
    this.dialog.open(AddAssetComponent)
  }
  viewAsset(assetView:assetsDTO){
    //console.log(assetView);

    const viewRef=this.dialog.open(ViewAssetComponent,{

      data:assetView
    })

  }
  updateAsset(asset:assetsDTO){
    const dialogRef= this.dialog.open(UpdateAssetComponent,{
      height:'90%',
      width:'40%',
      data:asset
    })
  }
  deleteAsset(assetId:number){
    //console.log(assetId);

    if(confirm("do you want to delete")){
      this.assetService.deleteAssetById(assetId)
      .subscribe(
        data => {
          this.deleteAsset = data;
        }
      )
    }
    this.reloadComponent();

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
