import { Component, OnInit, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userServiceObj = inject(UserService)

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  ngOnInit(): void {
    setInterval(()=>this.userServiceObj.setLoginStatus(),1000)
  }
  
}
