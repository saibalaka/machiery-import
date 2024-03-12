import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  products:[]

  ngOnInit(): void {
    this.getProducts()
  }

  //method to get the products from the server
  getProducts(){
    this.productServiceObj.getProducts().subscribe({
      next:res=>{
        console.log(res)
        this.products = res.payload
      },
      error:err=>{
        console.log("error getting all the products ",err)
      }
    })
  }


}
