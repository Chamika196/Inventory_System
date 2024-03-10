import { Component, OnDestroy } from '@angular/core';
import { AddCategory } from '../model/add-category.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategory;
  private addCategorySubscription?: Subscription;
  constructor(private categoryservice: CategoryService, private router: Router) {
    this.model = {
      categoryName: '',
      categoryDescription: '',
      
    };
  }

  onFormSubmit(){
    this.categoryservice.createCategory(this.model)
    .subscribe({
      next:(response) => {
        this.router.navigateByUrl('/categories');
      }
    })
  }
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
