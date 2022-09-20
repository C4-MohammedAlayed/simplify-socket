import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 URL = environment.Url
  constructor(private http:HttpClient) { }

  getAllUsers() :Observable<any>{
  return  this.http.get(`${this.URL + "user"}`)
  }
}
