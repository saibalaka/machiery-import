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
      companyName :['',Validators.required],
      typeOfBuss : ['',Validators.required],
      name : ['',Validators.required],
      emailId : ['',Validators.required],
      phone : [,Validators.required],
      quoteStatus:['Pending'],
      address :this.fb.group({
        city:['',Validators.required],
        country : ['',Validators.required],
        pinCode :['',Validators.required],
      })
  })

  onDetailsFormSubmit(){
    console.log(this.importerDetails.value);
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