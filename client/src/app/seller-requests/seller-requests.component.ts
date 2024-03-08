import { Component,inject,effect,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-requests',
  templateUrl: './seller-requests.component.html',
  styleUrl: './seller-requests.component.css'
})
export class SellerRequestsComponent implements OnInit{

  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  username =this.userServiceObj.logedUsername()
  role = this.userServiceObj.role()
  sellerRequests
  productDetails=[]
  importerDetails = []


  constructor(){
    effect(()=>{
      this.username =this.userServiceObj.logedUsername()
      this.role = this.userServiceObj.role()
    })
  }
  
  
  ngOnInit(): void {
    this.userServiceObj.getUserRequests(this.username,this.role).subscribe({
      next:res=>{
        this.sellerRequests = res.payload
        this.sellerRequests.forEach(request=>{
          this.getImporterData(request.importerId)
          this.getProductData(request.productId)
        })
      },
      error:err=>{
        console.log("error getting user requests ",err)
      }
    })

  }

  sendResponse(index,status,bId,sId){
    let statusObj = {index:index,status:status,buyerId:bId,sellerId:sId}
    //response status in buyer req
    this.userServiceObj.updateStatus(statusObj,'buyer').subscribe({
      next:res=>{
        console.log("after sending res ",res)
      },
      error:err=>{
        console.log("error while sending response ",err)
      }
    })
    //response status in seller req
    this.userServiceObj.updateStatus(statusObj,'seller').subscribe({
      next:res=>{
        console.log("after sending res ",res)
      },
      error:err=>{
        console.log("error while sending response ",err)
      }
    })

  }

  //remove response
  remove(index,id){
    let deleteObj = {index:index,sellerId:id}
    this.userServiceObj.deleteRequest(deleteObj,'seller').subscribe({
      next:res=>{
        console.log(res)
        this.userServiceObj.getUserRequests(this.username,this.role).subscribe({
          next:res=>{
            console.log("buyer ",res)
            this.sellerRequests = res.payload
          },
          error:err=>{
            console.log("error getting user requests ",err)
          }
        })
      },
      error:err=>{
        console.log("error removing the seller request",err)
      }
    })
  }

  //get product details 
  getProductData(id){
    this.productServiceObj.getProductById(id).subscribe({
      next:res=>{
        this.productDetails.push(res.payload)
      },
      error:err=>{
        console.log("error getting product details",err)
      }
    })
  }

  //get importer details
  getImporterData(id){
    this.userServiceObj.getImporterById(id).subscribe({
      next:res=>{
        this.importerDetails.push(res.payload)
      },
      error:err=>{
        console.log("error getting importer details",err)
      }
    })
  }

  

}
