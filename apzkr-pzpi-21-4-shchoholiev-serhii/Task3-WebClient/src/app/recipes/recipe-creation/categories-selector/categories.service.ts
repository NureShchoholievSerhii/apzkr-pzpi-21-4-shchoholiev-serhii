import { Injectable } from '@angular/core';
import { ApiService } from '../../../network/api.service';
import { Category } from '../../category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    
    constructor(
        private apiService: ApiService
    ) { }

    getCategoriesPage(page: number, size: number, search: string) {
        return this.apiService
            .get<any>(`/categories?page=${page}&size=${size}&search=${search}`);
    }

    addCategory(category: Category) {
        return this.apiService
            .post<Category>('/categories', category);
    }
}
