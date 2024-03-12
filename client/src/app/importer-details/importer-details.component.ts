import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Importer } from '../models/user';

@Component({
  selector: 'app-importer-details',
  templateUrl: './importer-details.component.html',
  styleUrl: './importer-details.component.css'
})
export class ImporterDetailsComponent {

  userServiceObj = inject(UserService);
  routerObj = inject(Router);
  fb:FormBuilder = inject(FormBuilder);

  importerDetails = this.fb.group({
      companyName :['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
      typeOfBuss : ['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
      name : ['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
      emailId : ['',[Validators.required,Validators.email]],
      phone : [,[Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}')]],
      quoteStatus:['Pending'],
      address :this.fb.group({
        city:['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
        country : ['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
        pinCode :['',[Validators.required,Validators.pattern('[1-8]{1}[0-9]{5}')]],
      })
  })

  get companyName(){
    return this.importerDetails.get('companyName')
  }
  get typeOfBuss(){
    return this.importerDetails.get('typeOfBuss')
  }
  get name(){
    return this.importerDetails.get('name')
  }
  get emailId(){
    return this.importerDetails.get('emailId')
  }
  get phone(){
    return this.importerDetails.get('phone')
  }
  get address(){
    return this.importerDetails.get('address')
  }
  get city(){
    return this.importerDetails.get('city')
  }
  get country(){
    return this.importerDetails.get('country')
  }
  get pinCode(){
    return this.importerDetails.get('pinCode')
  }


  //to store data into the data base afte submition
  onDetailsFormSubmit(){
    let importer = this.importerDetails.value;
    let address = {city:importer.address.city,country:importer.address.country,pinCode:importer.address.pinCode}
    let newImporter = new Importer(importer.companyName,importer.typeOfBuss,importer.name,importer.emailId,importer.phone,importer.quoteStatus,address)
    this.userServiceObj.createImporter(newImporter).subscribe({
      next:(res)=>{
        console.log("res ",res)
        this.routerObj.navigate(['single-product'])
      },
      error:(err)=>{
        console.log("Error in storing importer details ",err);
      }
    })
  }

}