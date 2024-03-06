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
  @Output() data = new EventEmitter<{showAdd:boolean, showUpdate:boolean}>(); 
  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  routerObj = inject(Router)
  role = this.userServiceObj.role()
  showAdd = false;
  showUpdate = false;

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
    this.data.emit({showAdd:this.showAdd, showUpdate:this.showUpdate}); 
  } 

  addProduct(){
    this.showAdd=true;
    this.showUpdate = false;
    this.sendData()
  }

  editProduct(){
    this.showAdd=false;
    this.showUpdate = true;
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

