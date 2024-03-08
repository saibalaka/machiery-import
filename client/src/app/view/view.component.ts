import { Component,Input,OnChanges,SimpleChanges,inject,effect,EventEmitter,Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnChanges{

  @Input() products=[]
  @Output() data = new EventEmitter<{showAdd:boolean, showUpdate:boolean ,productId:string}>(); 
  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  routerObj = inject(Router)
  role = this.userServiceObj.role()
  showAdd = false;
  showUpdate = false;
  productId = '';

  constructor(){
    effect(()=>{
      this.role=this.userServiceObj.role()
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    changes['products']
  }

  sendData() 
  { 
    this.data.emit({showAdd:this.showAdd, showUpdate:this.showUpdate ,productId:this.productId}); 
  } 

  addProduct(){
    this.showAdd=true;
    this.showUpdate = false;
    this.productId = '';
    console.log("sending empty product id ")
    this.sendData()
  }

  editProduct(proId){
    this.showAdd=false;
    this.showUpdate = true;
    this.productId = proId,
    console.log("sending product id ")
    this.sendData()
  }

  //to remove the product
  removeProduct(id){
    this.productServiceObj.removeProduct(id).subscribe({
      next:res=>{
        console.log("remove res ",res)
      },
      error:err=>{
        console.log('error removing product ',err)
      }
    })
  }

  //view data 
  viewData(id){
    this.routerObj.navigate([`single-product/${id}`])
  }
}

