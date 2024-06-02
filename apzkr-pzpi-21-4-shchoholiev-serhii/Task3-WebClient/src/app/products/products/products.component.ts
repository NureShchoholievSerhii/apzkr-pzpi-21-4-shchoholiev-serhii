import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  groupId: string;
  searchQuery: string = '';
  newProduct: Product = new Product();

  editingIndex: number | null = null; 
  
  constructor(
    private productsService: ProductsService, 
    private route: ActivatedRoute
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.setPage(1);
    });
  }

  /**
   * Sets the current page and triggers a search for items.
   * @param page The page number to set.
   */
  setPage(page: number): void {
    this.currentPage = page;
    this.isLoading = true;
    this.productsService.getProducts(this.currentPage, this.pageSize, this.groupId, this.searchQuery)
      .subscribe(
        data => {
          this.products = data.items;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        }
      );
  }

  /**
   * Adds a new product based on input fields.
   */
  addProduct(): void {
    this.newProduct.groupId = this.groupId;
    this.productsService.addProduct(this.newProduct)
      .subscribe(
        data => {
          this.newProduct = new Product(); 
          this.isLoading = true;
          this.setPage(1);
        }
      );
  }

  /**
   * Toggles the editing mode of a product.
   */
  toggleEdit(index: number): void {
    if (this.editingIndex !== null) {
      this.productsService.updateProductCount(this.products[this.editingIndex].id, this.products[this.editingIndex].count)
        .subscribe(() => {
          this.editingIndex = null;
          this.isLoading = true;
          this.setPage(1);
        });
    }
    this.editingIndex = this.editingIndex === index ? null : index;
  }
}
