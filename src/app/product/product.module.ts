import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";



@NgModule({
    declarations: [
        ProductComponent
    ],
    exports: [
        ProductComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule
  ]
})
export class ProductModule { }
