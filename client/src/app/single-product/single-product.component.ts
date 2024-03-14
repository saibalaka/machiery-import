import { Component,OnInit,inject,effect } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent implements OnInit {

  userServiceObj = inject(UserService)
  productServiceObj = inject(ProductService)
  routerObj = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  selectedMachine
  importerName = this.userServiceObj.logedUsername()
  buyerDetails
  sellerDetails
  qty= new FormControl('',Validators.required)

  constructor(){
    effect(()=>{
      this.importerName = this.userServiceObj.logedUsername()
      this.buyerDetails = this.userServiceObj.logedUser()
    })
  }

  //oninit method
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductById(id)
  }

  //get products by id 
  getProductById(id){
    this.productServiceObj.getProductById(id).subscribe({
      next:res=>{
        let sellerName = res.payload.sellername
        this.selectedMachine = res.payload
        this.getSellerData(sellerName)
      },
      error:err=>{
        console.log("Error getting product details ",err)
      }
    })
  }

  //method to get the userdetails by name
  getSellerData(sellerName){
    this.userServiceObj.getUserByName(sellerName,'seller').subscribe({
      next:res=>{
        this.sellerDetails = res.payload
        console.log("seller details ",res)
      },
      error:err=>{
        console.log("error getting the seller details ",err)
      }
    })
  }

  //afte selecting the product
  onSelecting(){
    console.log("importer name is ",this.importerName)
    this.userServiceObj.getImporterByName(this.importerName).subscribe({
      next:res=>{
        console.log("got the importer detils after get qoute",res)
        if(res.message==='Importer does not exist'){
          this.navigateToImporter()
        }else{
          let productId = this.activatedRoute.snapshot.paramMap.get('id');
          let importerId = res.payload._id
          let buyerReq = {buyerId:this.buyerDetails._id,productId:productId,status:'pending',qty:Number(this.qty.value),sellerId:this.sellerDetails._id}
          let sellerReq = {productId:productId,importerId:importerId,buyerId:this.buyerDetails._id,sellerId:this.sellerDetails._id,status:'pending',qty:Number(this.qty.value)}
          this.updateBuyer(buyerReq)
          this.updateSeller(sellerReq)
          this.routerObj.navigate(['buyer-requests'])
        }
      }
    })
  }

  //if imoporter is new
  navigateToImporter(){
    let productId = this.activatedRoute.snapshot.paramMap.get('id');
    let buyerReq = {buyerId:this.buyerDetails?._id,productId:productId,status:'pending',qty:Number(this.qty.value)}
    this.userServiceObj.updateRequests(buyerReq,'buyer')
    this.routerObj.navigate([`importer-details/${productId}`])
  }

  //update seller requests
  updateSeller(sellerReq){
    this.userServiceObj.updateRequests(sellerReq,'seller').subscribe({
      next:res=>{
        console.log("after pushig data to seller",res)
      },
      error:err=>{
        console.log("error pushing data to seller ",err)
      }
    })
  }

  //update buyer requests
  updateBuyer(buyerReq){
    this.userServiceObj.updateRequests(buyerReq,'buyer').subscribe({
      next:res=>{
        console.log("after pushig data to buyer",res)
      },
      error:err=>{
        console.log("error pushing data to buyer ",err)
      }
    })
  }

}
