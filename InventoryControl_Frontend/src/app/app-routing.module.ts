import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { CategoryListComponent } from './features/product_category/category-list/category-list.component';
import { EditProductComponent } from './features/product/edit-product/edit-product.component';
import { AddProductComponent } from './features/product/add-product/add-product.component';
import { ProductDetailComponent } from './features/product/product-detail/product-detail.component';
import { EditCategoryComponent } from './features/product_category/edit-category/edit-category.component';
import { AddCategoryComponent } from './features/product_category/add-category/add-category.component';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'products',
    component:ProductListComponent
  },
  {
    path:'product/edit/:id',
    component:EditProductComponent
  },
  {
    path:'products/add',
    component:AddProductComponent
  },
  {
    path:'product/detail/:productId',
    component:ProductDetailComponent
  },
  {
    path:'categories',
    component:CategoryListComponent
  },
  {
    path:'category/edit/:id',
    component:EditCategoryComponent
  },
  {
    path:'categories/add',
    component:AddCategoryComponent
  },
  {
    path:'category/detail/:categoryId',
    component:ProductDetailComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
