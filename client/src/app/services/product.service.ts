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
        return this.httpClientObj.get(`http://localhost:4000/product-api/products`)
    }

    //get products by seller name
    getProductsBySellername(sellername):Observable<any>{
        return this.httpClientObj.get(`http://localhost:4000/product-api/products/${sellername}`)
    }

    //create new product
    createProduct(newProduct):Observable<any>{
        return this.httpClientObj.post(`http://localhost:4000/product-api/product`,newProduct)
    }

    //update the existing product
    updateProduct(modifiedProduct):Observable<any>{
        return this.httpClientObj.post(`http://localhost:4000/product-api/product`,modifiedProduct)
    }

    //remove the product by id
    removeProduct(id:string):Observable<any>{
        return this.httpClientObj.delete(`http://localhost:4000/product-api/product/${id}`)
    }

    //get Product by name
    getProductById(id:string):Observable<any>{
        return this.httpClientObj.get(`http://localhost:4000/product-api/product/${id}`)
    }

}