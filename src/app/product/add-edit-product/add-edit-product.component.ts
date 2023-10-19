import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {MessageService} from "primeng/api";
import {Product} from "../product";
import {ProductModule} from "../product.module";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnChanges {

  @Input() displayModal:boolean = true;
  @Input() selectedProduct : any= null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>;
  modalType: string = 'Add';

  productForm : FormGroup = this._fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required]
  });
  constructor(private _fb: FormBuilder,
              private _productService: ProductService,
              private _messageService: MessageService) { }

  ngOnInit(): void {

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

  ngOnChanges() {
    if(this.selectedProduct) {
      this.modalType = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
    }else {
      this.modalType = 'Add';
      this.productForm.reset()
    }
  }

  addEditProduct() {
    console.log("formValue : ")
    console.log(this.productForm.value)
    this._productService.addProduct(this.productForm.value, this.selectedProduct).subscribe({
        next: (response) => {
          this.clickAddEdit.emit(response);
          console.log("response : ")
          console.log(response)
          this.closeModal();
          const msg = this.modalType === 'Add' ? 'Product Added' : 'Product Updated';
          this._messageService.add({severity: 'success', summary: 'Success', detail: msg});
        },
        error: err => {
          this._messageService.add({severity: 'error', summary: 'Error', detail: err});
        }
      }
    )
  }
}


