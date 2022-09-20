import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    // this.badgeCount = 0;
    // this.showNotifications = !this.showNotifications;
    // console.log(this.notificationList);
    
    // this.loginService.loginValues.userName.subscribe((user) => {
    //   this.userName = user;
    //   console.log(this.userName);
    // });
  }
}
