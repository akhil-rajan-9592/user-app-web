import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  api = environment.api+'files/'

  constructor( private http : HttpClient ) { }

  addfile(data): Observable<any>{
    return this.http.post(this.api+`add`,data)
  }
  getallfiles(): Observable<any>{
    return this.http.get(this.api+`list`)
  }

}
