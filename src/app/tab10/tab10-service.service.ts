import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tab10ServiceService {
  // readonly APIUrl = "http://localhost/TaskManager/api";
  readonly APIUrl = "http://localhost:63310/api";

  constructor(private http: HttpClient) { }

  getTaskList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Task');
  }

  addTask(val:any){
    return this.http.post(this.APIUrl+'/Task',val);
  }

  updateTask(val:any){
    return this.http.put(this.APIUrl+'/Task',val);
  }

  deleteTask(val:any){
    return this.http.delete(this.APIUrl+'/Task/'+val);
  }

  getAllPriorityName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Task/GetAllPriorityName');
  }

  getAllStatusName():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Task/GetAllStatusName');
  }
}
