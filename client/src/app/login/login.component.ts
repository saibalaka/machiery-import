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

  //form builder for getting the user credentials
  userCred = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(6)]],
    role:['',Validators.required]
  })

  //method to get and verify the credentials submitted by the user
  userLogin(){
    let userCred = new Userlog(this.userCred.value.username,this.userCred.value.password)
    this.userServiceObj.userLogin(userCred,this.userCred.value.role).subscribe({
      next:res=>{
        if(res.message==='Login success'){
          localStorage.setItem('token',res.token)
          this.userServiceObj.setLoggedUser(res.payload)
          this.userServiceObj.setUserRole(this.userCred.value.role)
          this.userServiceObj.setLoginStatus(true)
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


  //method to navigate to register component
  createAccount(){
    this.routerObj.navigate(['register'])
  }


}
