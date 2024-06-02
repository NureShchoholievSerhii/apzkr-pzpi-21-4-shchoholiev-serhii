import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Recipe } from './recipe.model';
import { RecipeCreateDto } from './recipe-creation/recipe-create-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  
  constructor(
    private apiService: ApiService
  ) { }

  addRecipe(recipe: RecipeCreateDto) {
    const formData = this.getFormData(recipe);

    return this.apiService
      .post<Recipe>('/recipes', formData);
  }

  updateRecipe(recipeId: string, recipe: RecipeCreateDto) {
    const formData = this.getFormData(recipe);

    return this.apiService
      .put<Recipe>(`/recipes/${recipeId}`, formData);
  }

  deleteRecipe(recipeId: string) {
    return this.apiService
      .delete(`/recipes/${recipeId}`);
  }

  getRecipe(recipeId: string) {
    return this.apiService
      .get<Recipe>(`/recipes/${recipeId}`);
  }

  getRecipesPage(page: number, size: number, groupId: string, search: string) {
    return this.apiService
      .get<any>(`/recipes?page=${page}&size=${size}&groupId=${groupId}&search=${search}`);
  }

  cookRecipe(recipeId: string) {
    return this.apiService
      .patch(`/recipes/${recipeId}/cook`, {});
  }

  private getFormData(recipeData: RecipeCreateDto) {
    const formData = new FormData();
    formData.append('name', recipeData.name);
    formData.append('text', recipeData.text);
    formData.append('groupId', recipeData.groupId);

    if (recipeData.thumbnail) {
      formData.append('thumbnail', recipeData.thumbnail, recipeData.thumbnail.name);
    }

    if (recipeData.ingredients) {
      recipeData.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}].id`, ingredient.id);
        formData.append(`ingredients[${index}].name`, ingredient.name);
        formData.append(`ingredients[${index}].count`, ingredient.count.toString());
      });
    }

    recipeData.categories.forEach((category, index) => {
      formData.append(`categories[${index}].id`, category.id);
      formData.append(`categories[${index}].name`, category.name);
    });

    return formData;
  }
}
