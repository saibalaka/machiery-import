import { Component, OnInit, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Product } from '../models/product';

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
  existingProductdata:Product
  showAdd = false;
  showUpdate = false;
  productId = '';


  productDetails = this.fb.group({
    title:[''],
    image:[''],
    discription:[''],
    cost:<number><unknown>[''],
    madein:[''],
    manufacturer:[''],
    sellername:['',Validators.required]
  })
  
  //constroctor to load the latest data from the service
  constructor(){
    effect(()=>{
      this.seller = this.userServiceObj.logedUser()
      this.sellername = this.userServiceObj.logedUsername()
    })
  }

  //ng oninit life cycle method
  ngOnInit(): void {
    this.getProductsOfSeller()
  }

  //get product by id 
  getProductById(productId){
    this.productServiceObj.getProductById(productId).subscribe({
      next:res=>{
        this.existingProductdata = res.payload
        this.fillTheForm()
        this.getProductsOfSeller()
      },
      error:err=>{
        console.log("error getting all the products ",err)
      }
    })
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

  //to store the new product data into the data base
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

  //to update the existing data
  updateMachinery(){
    let prod = this.productDetails.value
    let newProduct = new Product(this.existingProductdata._id,prod.title,prod.image,prod.discription,Number(prod.cost),prod.madein,prod.manufacturer,prod.sellername)
    console.log("sending the updated data is ",newProduct)
    this.productServiceObj.updateProduct(newProduct).subscribe({
      next:res=>{
        console.log("updating ",res)
      },
      error:err=>{
        console.log("error updating the product ",err)
      }
    })

  }

  //method to get input from the child component
  changeData(data){
    this.showAdd=data.showAdd
    this.showUpdate=data.showUpdate
    this.productId = data.productId
    if(this.productId!==''){
      console.log("product id is ",data.productId)
      this.getProductById(data.productId)
    }else{
      console.log("product id when sending empty product ",data.productId)
      console.log("product id when  empty product ",this.productId)
    }
  }

  //fill the form with existing data
  fillTheForm(){
    this.productDetails.controls['title'].setValue(this.existingProductdata.title);
    this.productDetails.controls['image'].setValue(this.existingProductdata.image);
    this.productDetails.controls['discription'].setValue(this.existingProductdata.discription);
    this.productDetails.controls['cost'].setValue(this.existingProductdata.cost);
    this.productDetails.controls['madein'].setValue(this.existingProductdata.madein);
    this.productDetails.controls['manufacturer'].setValue(this.existingProductdata.manufacturer);
    this.productDetails.controls['sellername'].setValue(this.existingProductdata.sellername);
  }

}
