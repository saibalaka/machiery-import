import { Component,inject,effect } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userServiceObj = inject(UserService);
  routerObj = inject(Router);
  user = this.userServiceObj.logedUser()
  role = this.userServiceObj.role()

  constructor(){
    effect(()=>{
      this.role = this.userServiceObj.role()
      this.user = this.userServiceObj.logedUser()
    })
  }

}
