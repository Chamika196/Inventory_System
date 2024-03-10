import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { UpdateCategory } from '../model/update-category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy{
  id: string | null = null;
  model?: Category;

  paramsSubcription?: Subscription;
  routeSubscription?: Subscription;
  updateCategorySubscription?: Subscription;
  getCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //get category from API
        if(this.id){
          this.getCategorySubscription = this.categoryService
          .getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.model =response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(){
    //convert this model to request object
    if(this.model && this.id){
      var updateCategory: UpdateCategory = {
        categoryName: this.model.categoryName,
        categoryDescription: this.model.categoryDescription
      };
      this.updateCategorySubscription = this.categoryService.updateCategory(this.id, updateCategory)
      .subscribe({
        next: (response)=>{
          this.router.navigateByUrl('/categories');
        }
      });
    }
  }
  onDelete(): void {
    if(this.id){
      //call service and delete category

      this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/categories');
        }
      });
    }
  }
ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
    this.getCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();

  }
}
