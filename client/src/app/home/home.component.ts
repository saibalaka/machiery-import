import { Component,inject,effect, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userServiceObj =inject(UserService)
  productServiceObj = inject(ProductService)
  routerObj = inject(Router)
  loginStatus:boolean
  user:{}
  role = this.userServiceObj.role()
  products

  constructor(){
    effect(()=>{
      this.loginStatus = this.userServiceObj.userLoginStatus()
      this.user = this.userServiceObj.logedUser()
      this.role = this.userServiceObj.role()
    })
  }

  //oninit method
  ngOnInit(): void {
    this.getProducts()
  }

  //get product details
  getProducts(){
    this.productServiceObj.getProducts().subscribe({
      next:res=>{
        this.products = res.payload
      },
      error:err=>{
        console.log("error getting all the products ",err)
      }
    })
  }

  //navigate to products
  navigate(){
    if(this.loginStatus){
      if(this.role==='seller'){
        this.routerObj.navigate(['seller-products'])      
      }else{
        this.routerObj.navigate(['products'])        
      }
    }else{
      this.routerObj.navigate(['login'])
    }
  }

}
