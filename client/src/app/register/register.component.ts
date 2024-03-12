import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userServiceObj = inject(UserService);
  routerObj = inject(Router)
  fb:FormBuilder = inject(FormBuilder)
  message:string = ''

  user = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(6)]],
    email:['',[Validators.required,Validators.email]],
    companyname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    role:['',Validators.required],
    requests:[[]]
  })

  get username(){
    return this.user.get('username');
  }
  get password(){
    return this.user.get('password');
  }
  get email(){
    return this.user.get('email');
  }
  get role(){
    return this.user.get('role');
  }
  get companyname(){
    return this.user.get('companyname');
  }

  //method to store the data of the user after submition
  onSubmitUser(){
    this.userServiceObj.role.set(this.user.value.role)
    let newUser = new User(this.user.value.username,this.user.value.password,this.user.value.email,this.user.value.companyname,this.user.value.requests,)
    this.userServiceObj.createUser(newUser,this.user.value.role).subscribe({
      next:res=>{
        if(res.message==='user already exists'){
          this.message = res.message;
        }else{
          console.log("registration ",res)
          this.routerObj.navigate(['login'])
        }
      },
      error:err=>{
        console.log("error while registering user ",err)
      }
    })
  }


  //method to navigate to login page
  haveAccount(){
    this.routerObj.navigate(['login'])
  }

}
