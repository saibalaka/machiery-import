import { Component, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userServiceObj = inject(UserService);

  role = ''

  constructor(){
    effect(()=>{
      this.role=this.userServiceObj.role();
    })
  }

}
