import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(
    private apiService: ApiService
  ) { }

  getProducts(page: number, size: number, groupId: string, search: string) {
    return this.apiService
      .get<any>(`/products?page=${page}&size=${size}&groupId=${groupId}&search=${search}`);
  }

  addProduct(product: Product) {
    return this.apiService
      .post<Product>('/products', product);
  }

  updateProductCount(productId: string, count: number) {
    return this.apiService
      .patch<Product>(`/products/${productId}/count`, 
        { 
          count: count
        });
  }
}
