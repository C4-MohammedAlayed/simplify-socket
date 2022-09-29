import { Component, OnInit } from '@angular/core';
import { filter, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs';
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
  userId: any = '';
  soundNotfif: HTMLAudioElement = new Audio(
    '../../../assets/sound/so-proud-notification.mp3'
  );
  constructor(
    private notificationService: NotificationService,
    private socketioService: SocketioService,
    private tokenStorage: TokenStorgeService
  ) {
    
  }

  ngOnInit(): void {
    this.getNotifications();
    this.userName = this.tokenStorage.getUserName();
    this.userId = this.tokenStorage.getUserId();
    this.socketioService.socket.on('test', (data: any) => {
     
      
      
      this.comming()
      
      
      this.badgeCount=this.notificationList.length
    });
    console.log("teeeeeest rom nav");
  }
  

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notificationList = res.results;
     
      this.badgeCount=this.notificationList.length
     
    });
   
  }
   
  comming(){

      this.notificationService.notification.subscribe(receiver_id=>{
       
        console.log(receiver_id , this.userId);
        
        if (receiver_id == this.userId) {
          this.getNotifications()

       this.soundNotfif.play();
       
     
        }
        
        
       
      })
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
