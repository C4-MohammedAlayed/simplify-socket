import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { SocketioService } from 'src/app/Services/socket-io.service';
import { TokenStorgeService } from 'src/app/Services/token-storge.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  notificationList: any = [];
  badgeCount: any = 0;
  userName: string | null = '';
  // sound: HTMLAudioElement = new Audio(
  //   '../../../assets/Whatsapp Tone - iphone.mp3'
  // );
  constructor(
    private notificationService: NotificationService,
    private socketioService: SocketioService,
    private tokenStorage: TokenStorgeService
  ) {
    
  }

  ngOnInit(): void {
    this.getNotifications();
    this.userName = this.tokenStorage.getUserName();
    this.socketioService.socket.on('RECIEVE_MESSAGE', (data: any) => {
      // this.sound.play();
      
      
      this.notificationList.push(data)
      
      
      this.badgeCount=this.notificationList.length
    });
    
  }
  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notificationList = res.results;
      this.badgeCount=this.notificationList.length
    });
   
    
    
  }

  show() {
    console.log(this.notificationList);

    // this.badgeCount = 0;
    // this.showNotifications = !this.showNotifications;
    // console.log(this.notificationList);

    // this.loginService.loginValues.userName.subscribe((user) => {
    //   this.userName = user;
    //   console.log(this.userName);
    // });
  }

  ngOnDestroy() {
    this.notificationList.unsubscribe();
  }
}
