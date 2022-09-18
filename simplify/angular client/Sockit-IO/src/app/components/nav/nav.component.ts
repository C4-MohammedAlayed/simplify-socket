import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  badgeCount: any = 0;
  showNotifications: boolean = false;

  sound: HTMLAudioElement = new Audio(
    '../../../assets/Whatsapp Tone - iphone.mp3'
  );
  @ViewChild('element') element: any;
  notificationList: any = [];
  notificationFilter: any = [];
  userName: string = '';

  constructor(
   // private socketService: SocketioService,
  //  private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

}
