import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}

  postData(data : any){
    return this.http.post<any>("http://localhost:3000/StudentData",data);
    
  }

  getData(){
    return this.http.get<any>("http://localhost:3000/StudentData?_sort=id");
  }

  updateData(data : any,id:number){
    return this.http.put<any>("http://localhost:3000/StudentData/"+id,data);
    
  }

  deleteData(id:number){
    return this.http.delete<any>("http://localhost:3000/StudentData/"+id);
    
  }
}
