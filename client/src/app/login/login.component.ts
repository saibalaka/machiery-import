import { Component, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userlog } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userServiceObj = inject(UserService);
  fb:FormBuilder = inject(FormBuilder);
  routerObj = inject(Router)
  message:string = ''

  userCred = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(6)]],
    role:['',Validators.required]
  })

  userLogin(){
    let userCred = new Userlog(this.userCred.value.username,this.userCred.value.password)
    this.userServiceObj.userLogin(userCred,this.userCred.value.role).subscribe({
      next:res=>{
        if(res.message==='Login success'){
          let user = JSON.stringify(res.payload)
          localStorage.setItem('token',res.token)
          localStorage.setItem('user',user)
          this.routerObj.navigate(['user'])
        }else{
          this.message=res.message
        }
      },
      error:err=>{
        console.log("error while user login ",err)
      }
    })
  }

  get username(){
    return this.userCred.get('username')
  }

  get password(){
    return this.userCred.get('password')
  }

  createAccount(){
    this.routerObj.navigate(['register'])
  }


}
