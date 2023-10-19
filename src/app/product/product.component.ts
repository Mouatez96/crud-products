import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "./product";
import {ProductService} from "./product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  products!: Product[];
  displayAddEditModal: boolean = false;
  selectedProduct : any = null;
  subscriptions: Subscription[] = []
  pdtSubscription: Subscription= new Subscription();
  constructor(private _productService: ProductService,
              private _confirmationService: ConfirmationService,
              private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.pdtSubscription = this._productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: console.log
    })
    this.subscriptions.push(this.pdtSubscription);
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddEditModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  showEditModal(product: Product) {
    this.displayAddEditModal = true
    this.selectedProduct = product;
  }

  addEditProduct(newData: any) {
    console.log("before refresh")
    console.log("newDate : "+ newData.id)
    console.log("selectedProduct :" + this.selectedProduct.id)
    if(this.selectedProduct && newData.id === this.selectedProduct.id) {
      const productIndex = this.products.findIndex(data => data.id === newData.id)
      this.products[productIndex]= newData;
      console.log("update")
      console.log(newData)
    }else {
      console.log("add")
      console.log(newData)
      this.products.unshift(newData)
    }
  }

  deleteProduct(product: Product) {
    this._confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this._productService.deleteProduct(product.id).subscribe({
          next: response => {
            this.products = this.products.filter(data => data.id !== product.id)
            this._messageService.add({severity: "success", summary: "Success", detail: "Deleted successfully"})
          },
          error: error => {
            this._messageService.add({severity: "error", summary: "Error", detail: error})
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
