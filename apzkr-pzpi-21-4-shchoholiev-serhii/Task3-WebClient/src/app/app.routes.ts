import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GroupCreationComponent } from './groups/group-creation/group-creation.component';
import { GroupComponent } from './groups/group/group.component';
import { DevicesComponent } from './devices/devices/devices.component';
import { UsersManagementComponent } from './users/users-management/users-management.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeviceCreationComponent } from './devices/device-creation/device-creation.component';
import { ProductsComponent } from './products/products/products.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { AddRecipeComponent } from './recipes/recipe-creation/add-recipe.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] },
    { path: 'recipes/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard] },
    { path: 'recipes/:id/edit', component: AddRecipeComponent, canActivate: [AuthGuard] },
    { path: 'creategroup', component: GroupCreationComponent, canActivate: [AuthGuard] },
    { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'admin/createdevice', component: DeviceCreationComponent, canActivate: [AuthGuard] },
    { path: 'admin/users', component: UsersManagementComponent, canActivate: [AuthGuard] },
    { path: 'admin/users/:id', component: EditUserComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'addrecipe', component: AddRecipeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
