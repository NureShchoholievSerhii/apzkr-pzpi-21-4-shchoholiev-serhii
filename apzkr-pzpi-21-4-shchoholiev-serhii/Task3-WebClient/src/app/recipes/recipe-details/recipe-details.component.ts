import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = new Recipe();
  isLoading = true;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadRecipe(id);
      }
    });
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load recipe', err);
        this.isLoading = false; 
      }
    });
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe.id)
      .subscribe({
        next: () => {
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          console.error('Failed to delete recipe', err);
        }
      });
  }

  cookRecipe(): void {
    this.recipeService.cookRecipe(this.recipe.id)
      .subscribe({
        next: () => {
          alert('Cooked!');
        },
        error: (err) => {
          alert(err.error.message)
        }
      });
  }
}
