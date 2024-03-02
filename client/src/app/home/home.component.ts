import { Component,inject,effect } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userServiceObj =inject(UserService)
  loginStatus:boolean
  user:{}

  constructor(){
    effect(()=>{
      this.loginStatus = this.userServiceObj.userLoginStatus()
      this.user = this.userServiceObj.logedUser()
    })
  }
}
