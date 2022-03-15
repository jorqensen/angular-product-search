import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Product, SearchProductResponse } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cachedProduct$: Product[] = [];
  private readonly file: string = 'assets/products.json';

  constructor(private http: HttpClient) { }

  getProducts(query: string): Observable<Product[]> {
    if (! this.cachedProduct$.length) {
      this.http.get<SearchProductResponse>(this.file).pipe(
        tap(() => console.warn('No products cached, fetching freshly...'))
      ).subscribe((response: SearchProductResponse) => this.cachedProduct$ = response.content);
    }

    return of(this.cachedProduct$).pipe(
      map((products: Product[]) => products.filter(product => product.title.toLowerCase().match(query.toLocaleLowerCase())))
    );
  }
}
