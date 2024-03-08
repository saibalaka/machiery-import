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
  logedUser = signal<User>({username:'',password:'',email:'',companyname:'',requests:[{}]})
  logedUsername = signal('')

  //create new user
  createUser(newUser:User,role:string):Observable<any>{
    return this.httpClientObj.post(`http://localhost:4000/${role}-api/${role}`,newUser)
  }

  //get existing user by user name
  getUserRequests(username:string,role:string):Observable<any>{
    return this.httpClientObj.get(`http://localhost:4000/${role}-api/${role}-requests/${username}`)
  }

  //user Login
  userLogin(userCred:Userlog,role:string):Observable<any>{
    return this.httpClientObj.post(`http://localhost:4000/${role}-api/${role}-login`,userCred)
  }

  //get user by name
  getUserByName(username,role):Observable<any>{
    return this.httpClientObj.get(`http://localhost:4000/${role}-api/${role}/${username}`)
  }

  //get user by id
  getUserById(id,role):Observable<any>{
    return this.httpClientObj.get(`http://localhost:4000/${role}-api/${role}-id/${id}`)
  }

  //update user requests
  updateRequests(newRequest,role):Observable<any>{
    return this.httpClientObj.put(`http://localhost:4000/${role}-api/${role}-requests`,newRequest)
  }

  //update user status
  updateStatus(statusObj,role):Observable<any>{
    return this.httpClientObj.put(`http://localhost:4000/${role}-api/${role}-status`,statusObj)
  }

  //delete the request
  deleteRequest(deleteObj,role):Observable<any>{
    return this.httpClientObj.put(`http://localhost:4000/${role}-api/${role}-delete-req`,deleteObj)
  }
  
  //create importer
  createImporter(newImporter:Importer):Observable<any>{
    return this.httpClientObj.post(`http://localhost:4000/importer-api/importer`,newImporter)
  }

  //get importer by name
  getImporterByName(name):Observable<any>{
    return this.httpClientObj.get(`http://localhost:4000/importer-api/importer/${name}`)
  }

  //get importer by id
  getImporterById(id):Observable<any>{
    return this.httpClientObj.get(`http://localhost:4000/importer-api/importer-id/${id}`)
  }

  //set the logied in user status
  setUserRole(value){
    this.role.set(value)
  }

  //set logged user
  setLoggedUser(user){
    this.logedUser.set(user)
    this.logedUsername.set(user.username)
  }

  //set userlogin status
  setLoginStatus(value){
    if(localStorage.getItem('token')===null){
      this.userLoginStatus.set(false)
    }else{
      this.userLoginStatus.set(value)
    }
  }

}
