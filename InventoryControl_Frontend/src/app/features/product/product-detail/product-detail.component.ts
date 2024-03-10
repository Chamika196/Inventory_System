import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Get the productid from the route parameters
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      // Load the details of the specific product
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    }
  }
  goBack() {
    this.router.navigate(['/products']);
    }
}
