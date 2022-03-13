import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
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
  public maxPerPage: number = 20;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      map(products => products.content)
    ).subscribe(products => this.products = products);

    this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => console.log('Supposed to fetch products here and filter...')),
    ).subscribe(input => "Query by: " + console.log(input));
  }

  numberOfPages(): number {
    return Math.ceil(this.products!.length / this.maxPerPage);
  }
}
