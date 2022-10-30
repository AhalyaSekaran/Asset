import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../admin/register/register.component';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

  }






  constructor(private dailog:MatDialog,private router:Router) { }

  ngOnInit(): void {
  }
  addAdmin(){
    this.dailog.open(RegisterComponent,{
      width:'600px',
      height:'500px'
    });
  }
  logout()
  {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
  toggle(){

  }

}
