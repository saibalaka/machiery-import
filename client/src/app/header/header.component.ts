import { Component, OnInit, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userServiceObj = inject(UserService)
  loginStatus = this.userServiceObj.userLoginStatus()


  //constructor method
  constructor(){
    effect(()=>{
      this.loginStatus = this.userServiceObj.userLoginStatus()
    })
  }

  //ng on it it lifecycle method
  ngOnInit(): void {
    setInterval(()=>this.userServiceObj.setLoginStatus(),1000)
  }


  //method for logout
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
