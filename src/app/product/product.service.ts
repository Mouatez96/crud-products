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
}
