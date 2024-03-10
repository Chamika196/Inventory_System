import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit{
  category: Category | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Get the categoryid from the route parameters
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId) {
      // Load the details of the specific categories
      this.categoryService.getCategoryById(categoryId).subscribe(category => {
        this.category = category;
      });
    }
  }
  goBack() {
    this.router.navigate(['/categories']);
    }

}
