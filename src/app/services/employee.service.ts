import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private _http:HttpClient) { }
//baseurl
  addEmployee(data:any):Observable<any>{
    return this._http.post('http://localhost:5000/newapi/emp',data)
    
  } 
  updateEmployee(_id:string,data:any):Observable<any>{
    return this._http.put(`http://localhost:5000/newapi/emp/${_id}`,data)
    
  }
  getEmployeeList():Observable<any>{
    return this._http.get('http://localhost:5000/newapi/emp')
  }
  deleteEmployee(_id:string):Observable<any>{
    return this._http.delete(`http://localhost:5000/newapi/emp/${_id}`)
  }


}
