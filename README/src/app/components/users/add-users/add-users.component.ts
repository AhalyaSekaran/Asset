import { ServicesComponent } from './../../admin/services/services.component';
import { EmployeeDto } from 'src/app/dto/employeeDto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {


  newUser:EmployeeDto=new EmployeeDto();
  newUserGroup:any;
  constructor(private service:EmployeeServiceService,private router:Router,private toast:NgToastService,private dialogRef:MatDialogRef<AddUsersComponent>) { }



  ngOnInit(): void {

    this.newUserGroup = new FormGroup({
      "empId": new FormControl(null, [Validators.required, Validators.pattern('')]),
      "firstName": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*')]),
      "lastName": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*')]),
      "mail":new FormControl(null,[Validators.required,Validators.email]),
      "mobile":new FormControl(null,[Validators.required,Validators.email]),
      "location": new FormControl(null, [Validators.required]),
      "department":new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      "designation": new FormControl(null, [Validators.required])

    });
  }

  get empId() { return this.newUserGroup.get('empId'); }
  get firstName() { return this.newUserGroup.get('firstName'); }
  get lastName() { return this.newUserGroup.get('lastName'); }
  get mail() { return this.newUserGroup.get('mail'); }
  get mobile() { return this.newUserGroup.get('mobile'); }
  get location() { return this.newUserGroup.get('location'); }
  get department() { return this.newUserGroup.get('department'); }
  get designation() { return this.newUserGroup.get('designation'); }
  submitted = false;

  addUser()
  {
    this.submitted=true;

    if(this.newUserGroup.valid){
   this.service.saveEmployee(this.newUser).subscribe((data)=>{
    console.log(data);
   },error=>{
    this.toast.success({detail:"Success",duration:3000,summary:"Admin Added SuccessFully"});
  this.dialogRef.close();
  this.dialogRef.afterClosed().subscribe(d=>{
    this.reloadCurrentRoute()
  });
})
}else{
  alert("form not valid")
   return this.newUserGroup;
}
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
