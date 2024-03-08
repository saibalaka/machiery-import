import { Component,effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  userServiceObj = inject(UserService)
  loginStatus = this.userServiceObj.userLoginStatus()
  role = this.userServiceObj.role()


  //constructor method
  constructor(){
    effect(()=>{
      this.loginStatus = this.userServiceObj.userLoginStatus()
      this.role = this.userServiceObj.role()
    })
  }

  //method for logout
  logout(){
    localStorage.removeItem('token')
    this.userServiceObj.setLoginStatus(false)
  }
}
