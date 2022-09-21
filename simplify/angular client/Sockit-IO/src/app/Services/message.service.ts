import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorgeService } from './token-storge.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
 Url = environment.Url;

 
  constructor(private http:HttpClient,private tokenStorgeService:TokenStorgeService) { }
 
  
  getAllMessages(): Observable<any> {
return this.http.get(`${this.Url+"message"}`).pipe(
  catchError(this.handleError) );

  }

  getAllMessagesById(id:string): Observable<any> {
    return this.http.get(`${this.Url+"message/"}${id}`).pipe(
      catchError(this.handleError) );
    
      }

      
     sendMessage(receiver_id:string,message:string){
      let token =this.tokenStorgeService.getToken()
     let header=new HttpHeaders().set('Authorization','Bearer '+token)
     return this.http.post(`${this.Url+"message/"}${receiver_id}`,message,{headers:header})
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
}
