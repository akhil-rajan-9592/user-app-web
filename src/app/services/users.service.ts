import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api = environment.api+'user/'
  constructor( private http : HttpClient) { }

  login(data): Observable<any>{
    return this.http.post(this.api+`login`,data)
  }

  register(data): Observable<any>{
    return this.http.post(this.api+`register`,data)
  }

  getuser(id): Observable<any>{
    return this.http.get(this.api+`read/${id}`)
  }
}
