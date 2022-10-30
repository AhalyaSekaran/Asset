import { assetCount } from './../../dto/assetCount';
import { assetsDTO } from './../../dto/assetsDTO';
import { AssetService } from './../../services/asset.service';
import { UnassignedAssetDTO } from './../../dto/getUnAssignedDTO';
import { AssignAssetComponent } from './../asset/assign-asset/assign-asset.component';
import { AddAssetComponent } from './../assets/add-asset/add-asset.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoogleChartComponent,ChartType } from 'angular-google-charts';
import { assignAssetDTO } from 'src/app/dto/assignAssetDTO';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private modal:MatDialog,private assetService:AssetService,private dashService:DashboardService) { }
unAssigned!:assetsDTO[];
assetCountForAll!:assetCount[]
assetCountForChennai!:assetCount;
assetCountForPune!:assetCount;
dataForPune !: any[]
dataForChennai! : any[]
dataForTotal !: any[]
loader=true;
  ngOnInit(): void {
    this.assetService.getUnassignedAsset().subscribe(data=>{

      this.unAssigned=data;
      console.log(this.unAssigned);
      this.loader=false;
    },error=>{

    })
// Load Availabae Assets

this.dashService.getCountOfUnAssignedAssets().subscribe(data=>{
    this.assetCountForAll=data;
    //console.clear()
    //console.log(this.assetCountForAll);

    this.assetCountForAll.forEach(element => {
      switch(element.location.toLowerCase()){
        case "chennai":
            this.assetCountForChennai=element
            break
        case "pune":
            this.assetCountForPune=element;
            break
      }
    });

    this.dataForPune = [
      ['Laptop', this.assetCountForPune.unAssignedLaptopCount],
      ['Bag',this.assetCountForPune.unAssignedBagCount],
      ['Mouse', this.assetCountForPune.unAssignedMouseCount],
      ['Charger', this.assetCountForPune.unAssignedLaptopChargerCount],
      ['DVR', this.assetCountForPune.unAssignedDvrCount],
      ['Headphones', this.assetCountForPune.unAssignedHeadphonesCount],
      ['Camera', this.assetCountForPune.unAssignedCameraCount],
      ['Data Card', this.assetCountForPune.unAssignedDataCardCount],
      ['Firewall', this.assetCountForPune.unAssignedFireWallCount],
      ['Mobile', this.assetCountForPune.unAssignedMobileCount],
      ['Projector', this.assetCountForPune.unAssignedProjectorCount],
      ['Speaker', this.assetCountForPune.unAssignedSpeakerCount],
      ['Switch', this.assetCountForPune.unAssignedSwitchCount],
    ];

    this.dataForChennai = [
      ['Laptop', this.assetCountForChennai.unAssignedLaptopCount],
      ['Bag',this.assetCountForChennai.unAssignedBagCount],
      ['Mouse', this.assetCountForChennai.unAssignedMouseCount],
      ['Charger', this.assetCountForChennai.unAssignedLaptopChargerCount],
      ['DVR', this.assetCountForChennai.unAssignedDvrCount],
      ['Headphones', this.assetCountForChennai.unAssignedHeadphonesCount],
      ['Camera', this.assetCountForChennai.unAssignedCameraCount],
      ['Data Card', this.assetCountForChennai.unAssignedDataCardCount],
      ['Firewall', this.assetCountForChennai.unAssignedFireWallCount],
      ['Mobile', this.assetCountForChennai.unAssignedMobileCount],
      ['Projector', this.assetCountForChennai.unAssignedProjectorCount],
      ['Speaker', this.assetCountForChennai.unAssignedSpeakerCount],
      ['Switch', this.assetCountForChennai.unAssignedSwitchCount],
    ];

    this.dataForTotal = [
      ['Laptop', this.assetCountForChennai.unAssignedLaptopCount+this.assetCountForPune.unAssignedLaptopCount],
      ['Bag',this.assetCountForChennai.unAssignedBagCount+this.assetCountForPune.unAssignedBagCount],
      ['Mouse', this.assetCountForChennai.unAssignedMouseCount+this.assetCountForPune.unAssignedMouseCount],
      ['Charger', this.assetCountForChennai.unAssignedLaptopChargerCount+this.assetCountForPune.unAssignedLaptopChargerCount],
      ['DVR', this.assetCountForChennai.unAssignedDvrCount+ this.assetCountForPune.unAssignedDvrCount],
      ['Headphones', this.assetCountForChennai.unAssignedHeadphonesCount+this.assetCountForPune.unAssignedHeadphonesCount],
      ['Camera', this.assetCountForChennai.unAssignedCameraCount+this.assetCountForPune.unAssignedCameraCount],
      ['Data Card', this.assetCountForChennai.unAssignedDataCardCount+this.assetCountForPune.unAssignedDataCardCount],
      ['Firewall', this.assetCountForChennai.unAssignedFireWallCount+this.assetCountForPune.unAssignedFireWallCount],
      ['Mobile', this.assetCountForChennai.unAssignedMobileCount+this.assetCountForPune.unAssignedMobileCount],
      ['Projector', this.assetCountForChennai.unAssignedProjectorCount+this.assetCountForPune.unAssignedProjectorCount],
      ['Speaker', this.assetCountForChennai.unAssignedSpeakerCount+ this.assetCountForPune.unAssignedSpeakerCount],
      ['Switch', this.assetCountForChennai.unAssignedSwitchCount+this.assetCountForPune.unAssignedSwitchCount],
    ];



})

  }





assign(assignAsset:assetsDTO){
  this.modal.open(AssignAssetComponent,{data:assignAsset})
}





columnNames = ['Available Asset', 'Count'];
height=200;
width=300;
type=ChartType.PieChart
myOptions = {
 tooltip:{
  isHtml:true,
  text:'value',
  trigger: 'none'
},
pieSliceText:'value'
};
}
