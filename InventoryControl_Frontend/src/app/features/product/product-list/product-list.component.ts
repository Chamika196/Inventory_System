import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { Category } from '../../product_category/model/category.model';
import { CategoryService } from '../../product_category/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  product$? : Observable<Product[]>;
  
  constructor(private productService: ProductService,private categoryService: CategoryService, private router: Router){}
  
  ngOnInit(): void {
    //get all categories from API
    //this.category$ = this.categoryService.getAllCategories();
  this.product$ = this.productService.getAllProducts();
  this.product$.subscribe(products => console.log(products));
  //this.category$.subscribe(categories => console.log(categories));
  }

}
