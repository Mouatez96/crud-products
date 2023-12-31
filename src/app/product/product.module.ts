import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AddEditProductModule} from "./add-edit-product/add-edit-product.module";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import { FilterProjectComponent } from './filter-project/filter-project.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ProductComponent,
        FilterProjectComponent
    ],
    exports: [
        ProductComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    AddEditProductModule,
    ToastModule,
    RippleModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class ProductModule { }
