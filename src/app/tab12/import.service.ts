import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  readonly APIUrl = "http://localhost:58451/api";

  constructor(private http: HttpClient) { }

  UploadFile(data: FormData): Observable<string> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };
    return this.http.post<string>(this.APIUrl + '/Upload', data, httpOptions);
  }

  Validating(data: FormData): Observable<string> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };
    return this.http.post<string>(this.APIUrl + '/Validate', data, httpOptions);
  }

  // downloadFile(): any {
	// 	return this.http.get(this.APIUrl + '/Export', {responseType: 'blob'});
  // }

  downloadFile(): Observable<string> {
    let headers = new HttpHeaders();
    const httpOptions = {
      observe: Response,
      responseType: ArrayBuffer
    };
    debugger
    return this.http.post<string>(this.APIUrl+'/Review/DownloadFile', httpOptions);
  }
  
  // GetAllIngredientName():Observable<any[]>{
  //   return this.http.get<any[]>(this.APIUrl+'/Ingredients/GetAllIngredientNames');
  // }
}


