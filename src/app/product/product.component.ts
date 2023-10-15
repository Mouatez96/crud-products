import { Component, OnInit } from '@angular/core';
import {Product} from "./product";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products!: Product[];
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this._productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: console.log
    })
  }
}
