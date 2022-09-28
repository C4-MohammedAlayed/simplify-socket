import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket:any
  notification=new BehaviorSubject<Array<string>>([])
  constructor(private messageService:MessageService) { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    
      
          
  }
  
  
  sendMessage(data:any){
    this.socket.emit("SEND_MESSAGE", data);
  }
  
  join(room:any){

    this.socket.emit("JOIN_ROOM", room);
  }
leave(room:any){
  this.socket.emit("LEAVE", room)
}
  ReciveMessage(data:any){
    this.socket.on("RECIEVE_MESSAGE", data)
  }

  connection(){
    this.socket.on("connection")
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
passGroup(data:any){
  this.notification.next(data)
}

}
