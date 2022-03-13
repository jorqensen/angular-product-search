import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchProductResponse } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly file: string = 'assets/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<SearchProductResponse> {
    return this.http.get<SearchProductResponse>(this.file);
  }
}
