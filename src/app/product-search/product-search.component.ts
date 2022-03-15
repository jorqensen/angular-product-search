import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Product } from 'src/types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  public products?: Product[] = [];
  public searchField = new FormControl(null);

  // Pagination
  public currentPage: number = 1;
  public maxPerPage: number = 6;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.productService.getProducts(query))
    ).subscribe((products) => {
      this.products = products;
      this.currentPage = 1;
    });
  }

  numberOfPages(): number {
    return Math.ceil(this.products!.length / this.maxPerPage);
  }
}
