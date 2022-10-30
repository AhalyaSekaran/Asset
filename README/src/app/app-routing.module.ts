import { AssetHistoryComponent } from './components/asset/asset-history/asset-history.component';
import { UpdateAssetComponent } from './components/asset/update-asset/update-asset.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { ServicesComponent } from './components/admin/services/services.component';
import { ListAssetComponent } from './components/asset/list-asset/list-asset.component';
import { ViewAssetComponent } from './components/asset/view-asset/view-asset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '',redirectTo:'/login',pathMatch:'full'},
  {path: 'assets',component:ListAssetComponent},
  {path: 'employee-list',component:ListUsersComponent},
  {path: 'login',component:LoginComponent},
  {path: 'admin/register',component:RegisterComponent},
  {path: 'services',component:ServicesComponent},
  // {path: 'admin/profile',component:ProfileComponent},
  {path:'dashboard',component:DashboardComponent},
  // {path:'profile',component:ProfileComponent},
  {path:'viewAsset/:id',component:ViewAssetComponent},
  {path:'updateAsset/:id',component:UpdateAssetComponent},
  {path:'history',component:AssetHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
