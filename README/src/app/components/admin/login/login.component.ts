import {  NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/authendication/auth.service';
import { LoginDto } from './../../../dto/loginDto';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key=='Enter')
      this.login();

  }
  constructor(private auth:AuthService,private router:Router,public toast:NgToastService) { }
  loginData:LoginDto=new LoginDto();

  loginGroup:any;
  ngOnInit() {

    this.loginGroup = new FormGroup({
      "empId": new FormControl(null, [Validators.required, Validators.pattern('[V]{1}[0-9]{5}')]),
      "password": new FormControl(null, [Validators.required])
    });


    if(sessionStorage.getItem('login')=='true'){
      this.router.navigateByUrl("/dashboard")
    }
    //console.log(this.getBrowserName());

  }
  get empId() { return this.loginGroup.get('empId'); }
  get password() { return this.loginGroup.get('password'); }

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
}
logedIn=false;
  login(){
    this.logedIn=true;
if(this.loginGroup.valid){
  this.auth.isLogedIn(this.loginData).subscribe(data=>
    {
      //console.log(data);

      sessionStorage.setItem('token',data.token);

      sessionStorage.setItem('login','true');

      this.toast.success({detail:"Loged in",summary:'Successfully Loged In ',duration:5000})
      sessionStorage.setItem('AdminPayload',atob(data.token.split(".")[1]));
    },error=>{

      this.toast.error({detail:"Loged Failed",summary:'invalid credentials ',duration:5000})
    });
}
else{
  return this.loginGroup;
}

  }



}
