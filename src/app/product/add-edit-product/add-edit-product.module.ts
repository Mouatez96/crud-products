import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './add-edit-product.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {MessageService} from "primeng/api";



@NgModule({
  declarations: [
    AddEditProductComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChipsModule
  ],
  exports: [
    AddEditProductComponent
  ],
  providers: [
    MessageService
  ]
})
export class AddEditProductModule { }
