import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Category } from '../../category.model';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  categories: Category[] = [];
  @Input() selectedCategories: Category[] = [];
  newCategoryName: string = '';
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;
  searchQuery = '';
  groupId = localStorage.getItem('groupId') || '';
  isLoading = true;
  @Output() onSelect = new EventEmitter<Category[]>();

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.setPage(1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.categoryService.getCategoriesPage(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe({
        next: (data) => {
          this.categories = data.items;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => console.error('Failed to load categories', err)
      });
  }

  addCategory(): void {
    const newCategory: Category = { id: '', name: this.newCategoryName };
    this.categoryService.addCategory(newCategory).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.newCategoryName = '';
        this.toggleSelection(category); // Select the newly added category
      },
      error: (err) => console.error('Failed to add category', err)
    });
  }

  toggleSelection(category: Category): void {
    const index = this.selectedCategories.findIndex(cat => cat.id === category.id);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.onSelect.emit(this.selectedCategories); 
  }

  isSelected(category: Category): boolean {
    return this.selectedCategories.some(p => p.id === category.id);
  }

  handleSearchChange(): void {
    this.setPage(1);
  }
}
