import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../products/products.service';
import { Product } from '../../../products/product.model';

@Component({
  selector: 'app-ingredient-selector',
  templateUrl: './ingredient-selector.component.html',
  styleUrls: ['./ingredient-selector.component.css']
})
export class IngredientSelectorComponent implements OnInit {
  ingredients: Product[] = [];
  @Input() selectedIngredients: Product[] = [];
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;
  searchQuery = '';
  groupId = localStorage.getItem('groupId') || '';
  isLoading = true;
  @Output() onSelect = new EventEmitter<Product[]>();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.setPage(1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.productsService.getProducts(this.currentPage, this.pageSize, this.groupId, this.searchQuery)
      .subscribe(
        response => {
          this.ingredients = response.items;
          this.totalPages = response.totalPages;
          this.isLoading = false;
        }
      );
  }

  toggleIngredientSelection(ingredient: Product): void {
    if (this.isSelected(ingredient)) {
      this.selectedIngredients = this.selectedIngredients.filter(p => p.id !== ingredient.id);
    } else {
      ingredient.count = 1;
      this.selectedIngredients.push(ingredient);
    }
    this.onSelect.emit(this.selectedIngredients);
  }

  isSelected(ingredient: Product): boolean {
    return this.selectedIngredients.some(p => p.id === ingredient.id);
  }

  handleSearchChange(): void {
    this.setPage(1);
  }
}
