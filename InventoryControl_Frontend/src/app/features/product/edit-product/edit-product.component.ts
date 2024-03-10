import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UpdateProduct } from '../model/update-product.model';
import { Category } from '../../product_category/model/category.model';
import { CategoryService } from '../../product_category/services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit, OnDestroy{
  id: string | null = null;
  model?: Product;
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];
  paramsSubcription?: Subscription;
  routeSubscription?: Subscription;
  updateProductSubscription?: Subscription;
  getProductSubscription?: Subscription;
  deleteProductSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
        next: (params) => {
            this.id = params.get('id');

            //get product from API
            if (this.id) {
                this.getProductSubscription = this.productService
                    .getProductById(this.id)
                    .subscribe({
                      next: (response) => {
                        
                        this.model = response;
                        // Map the IDs of categories associated with the product to the selectedCategories array
                        this.selectedCategories = response.categories.map(x => x.id);
                        console.log('Selected categories:', this.selectedCategories);
                    },
                    });
            }
        },
    });
}

  onFormSubmit(){
    //convert this model to request object
    if(this.model && this.id){
      var updateProduct: UpdateProduct = {
        
        productName: this.model.productName,
        categories: this.selectedCategories ?? [],
        productDescription: this.model.productDescription,
        productPrice: this.model.productPrice,
        productQuantity: this.model.productQuantity
      };
      this.updateProductSubscription = this.productService.updateProduct(this.id, updateProduct)
      .subscribe({
        next: (response)=>{
          this.router.navigateByUrl('/products');
        }
      });
    }
  }
  onDelete(): void {
    if(this.id){
      //call service and delete Product

      this.deleteProductSubscription = this.productService.deleteProduct(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/products');
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateProductSubscription?.unsubscribe();
    this.getProductSubscription?.unsubscribe();
    this.deleteProductSubscription?.unsubscribe();
  }
  

}
