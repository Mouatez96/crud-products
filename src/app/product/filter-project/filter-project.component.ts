import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.scss']
})
export class FilterProjectComponent implements OnInit, OnDestroy {

  categories: string[]= [];
  subscriptions: Subscription[] = [];
  categorySubscription: Subscription = new Subscription();

  @Output() selectCategory: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categorySubscription = this._productService.getCategories().subscribe(
      response => {
        console.log(response);
        this.categories = response;
      },
       error => console.log
    );
    this.subscriptions.push(this.categorySubscription)
  }

  onChangeCategory($event: any) {
    this.selectCategory.emit($event.value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
