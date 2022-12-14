import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const Url = environment.Url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient) { }

  login(userName: string, password: string, email: string):Observable<any>{
    return this.http.post(`${Url+"login"}`,{userName,password,email}, httpOptions)
  }
}
