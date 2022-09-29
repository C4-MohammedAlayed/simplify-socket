import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { TokenStorgeService } from './token-storge.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  Url = environment.Url;
  constructor(private http:HttpClient,private tokenStorgeService:TokenStorgeService) { }
  notification=new Subject()

  getNotifications(): Observable<any> {
    let token =this.tokenStorgeService.getToken()
     let header=new HttpHeaders().set("Authorization","bearer "+token)
    return this.http.get(`${this.Url+"notification/"}`,{headers:header}).pipe(
      catchError(this.handleError) );
  }

  sendNotification(receiver_id:string){
    let token =this.tokenStorgeService.getToken()
   let header=new HttpHeaders().set("Authorization","bearer "+token)
   console.log("work?");
   
   return this.http.post(`${this.Url+"notification/"}${receiver_id}`,{},{headers:header}).pipe(catchError(this.handleError) )
   } 

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }
  passNotifi(data:any){
   
    this.notification.next(data)
   
  }
}
