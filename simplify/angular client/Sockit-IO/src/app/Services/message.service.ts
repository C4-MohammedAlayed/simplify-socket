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
 
  
//   getAllMessages(): Observable<any> {
// return this.http.get(`${this.Url+"message"}`).pipe(
//   catchError(this.handleError) );

//   }

  getAllMessagesById(id:string): Observable<any> {
    let token =this.tokenStorgeService.getToken()
     let header=new HttpHeaders().set("Authorization","bearer "+token)
    return this.http.get(`${this.Url+"message/"}${id}`,{headers:header}).pipe(
      catchError(this.handleError) );
    
      }

      
     sendMessage(receiver_id:string,message:string){
      let token =this.tokenStorgeService.getToken()
     let header=new HttpHeaders().set("Authorization","bearer "+token)
     console.log("work?");
     
     return this.http.post(`${this.Url+"message/"}${receiver_id}`,message,{headers:header}).pipe(catchError(this.handleError) )
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
