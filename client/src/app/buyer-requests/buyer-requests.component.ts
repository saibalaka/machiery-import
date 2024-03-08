import { Component, effect, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-buyer-requests',
  templateUrl: './buyer-requests.component.html',
  styleUrl: './buyer-requests.component.css'
})
export class BuyerRequestsComponent {

  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  username =this.userServiceObj.logedUsername()
  role = this.userServiceObj.role()
  buyerRequests
  view:boolean=false;
  qutationData
  productsData = []
  sellersData = []


  constructor(){
    effect(()=>{
      this.username =this.userServiceObj.logedUsername()
      this.role = this.userServiceObj.role()
    })
  }
  
  
  ngOnInit(): void {
    this.view = false
    this.userServiceObj.getUserRequests(this.username,this.role).subscribe({
      next:res=>{
        this.buyerRequests = res.payload
        this.buyerRequests.forEach(request=>{
          this.getProductById(request.productId)
          this.getSellerById(request.sellerId)
        })
      },
      error:err=>{
        console.log("error getting user requests ",err)
      }
    })

  }

  remove(index:number,id:string){
    let deleteObj = {index:index,buyerId:id}
    this.userServiceObj.deleteRequest(deleteObj,'buyer').subscribe({
      next:res=>{
        console.log('res to remove ',res)
        this.userServiceObj.getUserRequests(this.username,this.role).subscribe({
          next:res=>{
            console.log("buyer ",res)
            this.buyerRequests = res.payload
          },
          error:err=>{
            console.log("error getting user requests ",err)
          }
        })
      },
      error:err=>{
        console.log("error while removing item ",err)
      }
    })
  }

  viewQutation(data){
    this.view = true;
    this.qutationData = data
  }

  viewReq(value:boolean){
    this.view = value
  }

  //get product data by id
  getProductById(id){
    this.productServiceObj.getProductById(id).subscribe({
      next:res=>{
        this.productsData.push(res.payload)
      },
      error:err=>{
        console.log("error getting product details",err)
      }
    })
  }

  //get seller data by id
  getSellerById(id){
    this.userServiceObj.getUserById(id,'seller').subscribe({
      next:res=>{
        this.sellersData.push(res.payload)
      },
      error:err=>{
        console.log("error getting seller details",err)
      }
    })
  }

}
