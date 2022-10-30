import { EmployeeDto } from 'src/app/dto/employeeDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  baseUrl:string;
  constructor(private  http:HttpClient) {
    this.baseUrl=environment.baseUrl;
   }

   
  getAllUsers():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/employee/employeelist`);
  }
  getAllInActiveUsers():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/employee/status/inactive`)
  }
  saveEmployee(employee:EmployeeDto):Observable<any>
  {
    
    return this.http.post(`${this.baseUrl}/employee/saveemployee`,employee)
  }
}
