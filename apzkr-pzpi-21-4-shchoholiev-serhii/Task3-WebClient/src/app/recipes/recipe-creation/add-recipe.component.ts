import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { RecipeCreateDto } from './recipe-create-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../products/product.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: RecipeCreateDto = new RecipeCreateDto();
  error: string | null = null;
  isLoading = true;
  isEditing = false;
  id: string = '';

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.isEditing = true;
        this.loadRecipe(this.id);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
  }

  addRecipe(): void {
    this.recipe.groupId = localStorage.getItem('groupId') || '';
    this.recipeService.addRecipe(this.recipe).subscribe({
      next: (response) => {
        this.error = null;
        this.router.navigate(['/recipes', response.id]);
      },
      error: (error) => {
        this.error = 'Failed to create the recipe.';
        console.error('Error:', error);
      }
    });
  }

  updateRecipe(): void {
    this.recipeService.updateRecipe(this.id, this.recipe).subscribe({
      next: (response) => {
        this.error = null;
        this.router.navigate(['/recipes', response.id]);
      },
      error: (error) => {
        this.error = 'Failed to update the recipe.';
        console.error('Error:', error);
      }
    });
  }

  handleFileInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (file) {
        this.recipe.thumbnail = file;
    }
  }

  addIngredients(selectedIngredients: any): void {
    this.recipe.ingredients = selectedIngredients;
  }

  addCategories(categories: any): void {
    this.recipe.categories = categories;
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => {
        this.recipe = {
          name: recipe.name,
          text: recipe.text,
          groupId: localStorage.getItem('groupId') || '',
          thumbnail: null,
          ingredients: recipe.ingredients,
          categories: recipe.categories
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load recipe', err);
        this.isLoading = false; 
      }
    });
  }
}
