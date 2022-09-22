import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  userId:string=""
  form!:FormGroup
  constructor(
    private socketioService: SocketioService,
    private messageService: MessageService,
    private tokenStorge: TokenStorgeService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
   this.initi();
    this.getAllUsers();
    
    this.userId = this.tokenStorge.getUserId();
    this.userName=this.tokenStorge.getUserName()
    console.log(this.userName , this.userId  );

    this.socketioService.socket.on("RECIEVE_MESSAGE", (data:any) => {
      this.messageList.push( data)}) 
    
    
  }

  initi(){
    this.form =new FormGroup({
      message:new FormControl()
    })
  }
getAllUsers(){
  this.userService.getAllUsers().subscribe(res=>{
   this.usersList= res.results

   console.log(this.usersList);
   
    
  })
}

  recieveMessageByID(id:any) {
    this.messageService.getAllMessagesById(id).subscribe(res=>{
      this.messageList=res.result
      console.log(this.messageList);
      
    }) 
  }

 findRoom(){
  let temp:any=[]
  temp.push(this.userId,this.selectUser[0])
  this.room=temp.sort().join("")
}

  sendMessage(){
    console.log("message:"+this.form.value.message);
    
    const messageContent = {
      room:this.room,
      content: {
        senderName: this.userName,
        message: this.form.value.message,
      },
    };
    //console.log(this.message);
    
    this.socketioService.sendMessage(messageContent);
    this.messageList.push(messageContent.content)
    this.messageService.sendMessage(this.selectUser[0],this.form.value).subscribe(res=>{
      console.log("res :"+ this.form.value,res);
      
    })
    
  }

  // when choose the user will get userid and recice all the message betrwwen them
  join(){
    this.findRoom()
    this.socketioService.socket.emit("JOIN_ROOM", this.room)
    console.log(this.room);
    this.recieveMessageByID(this.selectUser[0])
  }
}
