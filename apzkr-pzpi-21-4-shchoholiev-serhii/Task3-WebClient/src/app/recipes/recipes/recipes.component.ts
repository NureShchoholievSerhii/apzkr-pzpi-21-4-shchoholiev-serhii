import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { ImageUploadState } from '../image.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  searchQuery: string = '';
  groupId: string;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {
    this.groupId = localStorage.getItem('groupId') || '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.setPage(1);
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.isLoading = true;
    this.recipesService.getRecipesPage(this.currentPage, this.pageSize, this.groupId, this.searchQuery)
      .subscribe(
        data => {
          this.recipes = data.items;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        }
      );
  }

  displayThumbnail(recipe: Recipe): boolean {
    return recipe.thumbnail != null && recipe.thumbnail.imageUploadState == ImageUploadState.Uploaded;
  }
}
