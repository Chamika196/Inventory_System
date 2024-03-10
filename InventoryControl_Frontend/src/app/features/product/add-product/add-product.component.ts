import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddProduct } from '../model/add-product.model';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Category } from '../../product_category/model/category.model';
import { CategoryService } from '../../product_category/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit,OnDestroy{
  model: AddProduct;
  categories$?: Observable<Category[]>
  private addProductSubscription?: Subscription;
  constructor(private productservice: ProductService, private router: Router,private categoryService: CategoryService) {
    this.model = {
    productName: '',
    categories: [],
    productDescription: '',
    productPrice: 0,
    productQuantity: '',
      
    };
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
  onFormSubmit(){
    
    this.productservice.createProduct(this.model)
    .subscribe({
      next:(response) => {
        this.router.navigateByUrl('/products');
      }
    })
  }
  ngOnDestroy(): void {
    this.addProductSubscription?.unsubscribe();
  }

}
