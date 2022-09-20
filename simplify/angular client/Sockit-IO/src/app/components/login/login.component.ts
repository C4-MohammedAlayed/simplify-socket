import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/authentication.service';
import { TokenStorgeService } from 'src/app/Services/token-storge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!:FormGroup
  
  constructor(private authService:AuthService,private TokenStorge:TokenStorgeService,private router:Router ) { }

  ngOnInit(): void {
    this.initi()
  
  }

  initi(){
    this.myForm= new FormGroup({
      userName:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required,]),
      email:new FormControl("",[Validators.required,Validators.email])
  })
  }


login(){
  let {userName,email,password} =this.myForm.value



  this.authService.login(userName,password,email,).subscribe({
    next:res=>{
    this.TokenStorge.saveToken(res.token)
    this.TokenStorge.saveUser(res.userName)
    this.TokenStorge.saveUserID(res.userId)
    this.TokenStorge.setIsLoggedIn("true")
    console.log(res);
    
    this.router.navigate(['/socket']);
    },error:err=>{
      console.log(err);
      
    }

  })
  

}

}
