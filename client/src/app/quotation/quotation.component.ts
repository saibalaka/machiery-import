import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { User } from '../models/user';
import { Product } from '../models/product';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})
export class QuotationComponent implements OnChanges {

  productServiceObj = inject(ProductService)
  userServiceObj = inject(UserService)
  @Input() qutationData
  @Output() goBack = new EventEmitter<boolean>();
  buyerDetails:User
  sellerDetails:User
  productDetails:Product
  rate:number
  insurance:number;
  freight:number;
  cif:number;
  customDuty:number;
  total:number;



  ngOnChanges(changes: SimpleChanges): void {
    changes['qutationData']
    this.getSellerData()
    this.getBuyerDetails()
    this.getProductDetails()
  }

  //to get seller details
  getSellerData(){
    this.userServiceObj.getUserById(this.qutationData.sellerId,'seller').subscribe({
      next:res=>{
        console.log("Seller details ",res)
        this.sellerDetails = res.payload
      },
      error:err=>{
        console.log("error getting seller details",err)
      }
    })

  }

  //to get buyer details
  getBuyerDetails(){
    this.userServiceObj.getUserById(this.qutationData.buyerId,'buyer').subscribe({
      next:res=>{
        console.log("Buyer details ",res)
        this.buyerDetails = res.payload
      },
      error:err=>{
        console.log("error getting buyer details",err)
      }
    })

  }

  //get product details 
  getProductDetails(){
    this.productServiceObj.getProductById(this.qutationData.productId).subscribe({
      next:res=>{
        console.log("Product details ",res)
        this.productDetails = res.payload
        this.calculateCosts()
      },
      error:err=>{
        console.log("error getting product details",err)
      }
    })

  }

  //calculating costs
  calculateCosts(){
    this.rate = this.qutationData.qty*this.productDetails?.cost;
    this.freight = this.rate*0.1;
    this.insurance = this.rate*0.005;
    this.cif=this.rate+this.insurance+this.freight;
    this.customDuty=this.cif*0.298;
    this.total = this.customDuty+this.cif
  }

  //go back to requests
  goBackToRequests(){
    this.goBack.emit(false)
  }

}
