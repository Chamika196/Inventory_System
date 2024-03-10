import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AddProductComponent } from './features/product/add-product/add-product.component';
import { EditProductComponent } from './features/product/edit-product/edit-product.component';
import { ProductDetailComponent } from './features/product/product-detail/product-detail.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';

import { AddCategoryComponent } from './features/product_category/add-category/add-category.component';
import { EditCategoryComponent } from './features/product_category/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './features/product_category/category-details/category-details.component';
import { CategoryListComponent } from './features/product_category/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './public/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddProductComponent,
    EditProductComponent,
    ProductDetailComponent,
    ProductListComponent,
   
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
