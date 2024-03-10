import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  constructor(private categoryService: CategoryService, private router: Router){}
  category$? : Observable<Category[]>;
  ngOnInit(): void {
  //get all categories from API
  this.category$ = this.categoryService.getAllCategories();
  console.log(this.category$);
  }

}
