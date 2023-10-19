import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {MessageService} from "primeng/api";
import {Product} from "../product";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  @Input() displayModal:boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>;

  productForm !: FormGroup;
  constructor(private _fb: FormBuilder,
              private _productService: ProductService,
              private _messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  closeModal() {
    this.clickClose.emit(true);
    this.productForm.reset();
  }

  initForm() {
    this.productForm = this._fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  addProduct() {
    this._productService.addProduct(this.productForm.value).subscribe({
        next: (response) => {
          this.clickAdd.emit(response);
          this.closeModal();
          this._messageService.add({severity: 'success', summary: 'Success', detail: 'Product added'});
        },
        error: err => {
          this._messageService.add({severity: 'error', summary: 'Error', detail: err});
          console.log("Error occurred")
        }
      }
    )
  }
}


