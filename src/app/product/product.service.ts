import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://fakestoreapi.com/products";
  constructor(private _http: HttpClient) { }

  getProducts()  {
    return this._http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product, selectedProduct: any) {
    if(!selectedProduct) {
      return this._http.post(this.apiUrl, product);
    }else {
      return this._http.put(this.apiUrl+ `/${selectedProduct.id}`, selectedProduct)
    }
  }

  deleteProduct(id: number) {
    return this._http.delete(this.apiUrl+`/${id}`);
  }
}
