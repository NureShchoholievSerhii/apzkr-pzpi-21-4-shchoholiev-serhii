import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppRoutingModule } from './app.routes';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { GroupCreationComponent } from './groups/group-creation/group-creation.component';
import { GroupComponent } from './groups/group/group.component';
import { DevicesComponent } from './devices/devices/devices.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UsersManagementComponent } from './users/users-management/users-management.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DeviceCreationComponent } from './devices/device-creation/device-creation.component';
import { ProductsComponent } from './products/products/products.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { AddRecipeComponent } from './recipes/recipe-creation/add-recipe.component';
import { IngredientSelectorComponent } from './recipes/recipe-creation/ingredient-selector/ingredient-selector.component';
import { CategorySelectorComponent } from './recipes/recipe-creation/categories-selector/categories-selector.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';

export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    GroupCreationComponent,
    GroupComponent,
    DevicesComponent,
    PaginationComponent,
    UsersManagementComponent,
    EditUserComponent,
    DeviceCreationComponent,
    ProductsComponent,
    RecipesComponent,
    ImageUrlPipe,
    AddRecipeComponent,
    IngredientSelectorComponent,
    CategorySelectorComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => ({
          tokenGetter
        })
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
