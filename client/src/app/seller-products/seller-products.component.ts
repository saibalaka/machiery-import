import { Component, OnInit, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.css'
})
export class SellerProductsComponent implements OnInit {

  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  fb:FormBuilder= inject(FormBuilder)
  sellerProducts:[]
  seller = this.userServiceObj.logedUser()
  sellername = this.userServiceObj.logedUsername()
  existingProductdata
  showAdd = false;
  showUpdate = false;
  productId = '';


  productDetails = this.fb.group({
    title:[''],
    image:[''],
    discription:[''],
    cost:[''],
    madein:[''],
    manufacturer:[''],
    sellername:['',Validators.required]
  })
  
  
  constructor(){
    effect(()=>{
      this.seller = this.userServiceObj.logedUser()
      this.sellername = this.userServiceObj.logedUsername()
    })
  }

  ngOnInit(): void {
    this.getProductsOfSeller()
  }

  //get products data 
  getProductsOfSeller(){
    this.productServiceObj.getProductsBySellername(this.sellername).subscribe({
      next:res=>{
        console.log(res)
        this.sellerProducts = res.payload
      },
      error:err=>{
        console.log("error getting all the products ",err)
      }
    }) 
  }

  onSubmitData(){
    let newProduct = this.productDetails.value
    this.productServiceObj.createProduct(newProduct).subscribe({
      next:res=>{
        console.log('creating',res)
      },
      error:err=>{
        console.log("error creating new product ",err)
      }
    })

  }

  updateMachinery(){
    let newProduct = this.productDetails.value
    this.productServiceObj.updateProduct(newProduct).subscribe({
      next:res=>{
        console.log("updating ",res)
      },
      error:err=>{
        console.log("error updating the product ",err)
      }
    })

  }

  changeData(data){
    this.showAdd=data.showAdd
    this.showUpdate=data.showUpdate
    this.productDetails = data.productId
  }

}
