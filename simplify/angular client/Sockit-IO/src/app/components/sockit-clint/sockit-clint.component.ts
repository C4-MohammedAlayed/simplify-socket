import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/Services/message.service';
import { SocketioService } from 'src/app/Services/socket-io.service';
import { TokenStorgeService } from 'src/app/Services/token-storge.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-sockit-clint',
  templateUrl: './sockit-clint.component.html',
  styleUrls: ['./sockit-clint.component.scss'],
})
export class SockitClintComponent implements OnInit {
  usersList :any=[]
  messageText: any;
  userName: any;
  password: any;
  messageList: any = [];
  message: any;
  room: any;
  joinState: boolean = false;
  selectUser:string =""
  constructor(
    private socketioService: SocketioService,
    private messageService: MessageService,
    private tokenStorge: TokenStorgeService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.recieveMessage();
    this.getAllUsers()
    
    this.room = this.tokenStorge.getUserId();
    
  }

getAllUsers(){
  this.userService.getAllUsers().subscribe(res=>{
   this.usersList= res.results

   console.log(this.usersList);
   
    
  })
}

  recieveMessage() {
    this.socketioService.socket.on('connection', (data: any) => {
      this.messageService.getAllMessages().subscribe((res) => {
        console.log('res :' + res);
      });
    });
    console.log('res :');
  }

  sendMessage(){
    console.log(this.message);
    console.log(this.selectUser[0]);
    
  }
}
