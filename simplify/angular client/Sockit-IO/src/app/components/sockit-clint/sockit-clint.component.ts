import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  usersList: any = [];
  messageText: any;
  userName: any;
  password: any;
  messageList: any = [];
  message: any;
  room: any;
  joinState: boolean = false;
  selectUser: any = '';
  userId: string = '';
  form!: FormGroup;
  sound: HTMLAudioElement = new Audio('../../../assets/sound/messenger.mp3');
  constructor(
    private socketioService: SocketioService,
    private messageService: MessageService,
    private tokenStorge: TokenStorgeService,
    private userService: UsersService
  ) {}

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  ngOnInit(): void {
    this.initi();
    this.getAllUsers();
    this.scrollToBottom();
    this.userId = this.tokenStorge.getUserId();
    this.userName = this.tokenStorge.getUserName();
    console.log(this.userName, this.userId);

    this.socketioService.socket.on('RECIEVE_MESSAGE', (data: any) => {
      this.sound.play();
      this.messageList.push(data);
    });
  }

  ngAfterViewChecked() {       
     
    this.scrollToBottom();        
} 


  initi() {
    this.form = new FormGroup({
      message: new FormControl(),
    });
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      // to remove the user Who is logged in  from userBox chat
      this.usersList = res.results.filter(
        (res: { userName: string | any[] }) => res.userName != this.userName
      );
    });
  }

  recieveMessageByID(id: any) {
    this.messageService.getAllMessagesById(id).subscribe((res) => {
      this.messageList = res.result;
      console.log(this.messageList);
    });
  }

  findRoom() {
    console.log( this.selectUser[0]?.userName);
    
    let temp: any = [];
    temp.push(this.userId, this.selectUser[0].userId);
    this.room = temp.sort().join('');
  }

  sendMessage() {
    console.log('message:' + this.form.value.message);

    const messageContent = {
      room: this.room,
      content: {
        senderName: this.userName,
        message: this.form.value.message,
      },
    };
    //console.log(this.message);

    this.socketioService.sendMessage(messageContent);
    this.messageList.push(messageContent.content);
    this.messageService
      .sendMessage(this.selectUser[0].userId, this.form.value)
      .subscribe((res) => {});
    this.form.reset();
  }

  // when choose the user will get userid and recice all the message betrwwen them
  join() {
    this.findRoom();
    this.socketioService.socket.emit('JOIN_ROOM', this.room);
    console.log(this.room);
    this.recieveMessageByID(this.selectUser[0].userId);
  }

  // this fucntion to scrollDown auto after get all messages or send a new message  
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  log(){
console.log(this.selectUser[0].userId);

  }
}
