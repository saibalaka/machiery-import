import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    httpClientObj = inject(HttpClient)

    //get all the products
    getProducts():Observable<any>{
        return this.httpClientObj.get(`kk`)
    }

    //get products by seller name
    getProductsBySellername(sellername):Observable<any>{
        return this.httpClientObj.get(`kk/${sellername}`)
    }

    //create new product
    createProduct(newProduct):Observable<any>{
        return this.httpClientObj.post(`kk`,newProduct)
    }

    //update the existing product
    updateProduct(modifiedProduct):Observable<any>{
        return this.httpClientObj.post(`kk`,modifiedProduct)
    }

    //remove the product by id
    removeProduct(id):Observable<any>{
        return this.httpClientObj.delete(`kk/${id}`)
    }

}