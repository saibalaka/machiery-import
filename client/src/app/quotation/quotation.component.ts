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
      },
      error:err=>{
        console.log("error getting product details",err)
      }
    })

  }

  //go back to requests
  goBackToRequests(){
    this.goBack.emit(false)
  }

}
