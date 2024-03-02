import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Importer, User, Userlog } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClientObj = inject(HttpClient);
  role = signal('')
  userLoginStatus = signal(false)
  logedUser = signal({})

  //create new user
  createUser(newUser:User,role:string):Observable<any>{
    return this.httpClientObj.post(`http://localhost:4000/${role}-api/${role}`,newUser)
  }

  //get existing user by user name
  getUser():Observable<any>{
    return this.httpClientObj.get(`http://localhost:4000/user-api/user`)
  }

  //create importer
  createImporter(newImporter:Importer):Observable<any>{
    return this.httpClientObj.post(`http://localhost:4000/user-api/user`,newImporter)
  }

  //user Login
  userLogin(userCred:Userlog,role:string):Observable<any>{
    return this.httpClientObj.post(`http://localhost:4000/${role}-api/${role}-login`,userCred)
  }

  //set userlogin status
  setLoginStatus(){
    if(localStorage.getItem('token')===null){
      this.userLoginStatus.set(false)
      this.logedUser.set({})
    }else{
      this.userLoginStatus.set(true)
      this.logedUser.set(JSON.parse(localStorage.getItem('user')))
    }
  }

}
