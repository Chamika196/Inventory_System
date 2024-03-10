import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from '../model/add-product.model';
import { Product } from '../model/product.model';
import { environment } from '../../../../environments/environment';
import { UpdateProduct } from '../model/update-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(data: AddProduct):Observable<Product>{
    return this.http.post<Product>(`${environment.apiBaseUrl}/api/product`,data);
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/api/product`);
  }

  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${environment.apiBaseUrl}/api/product/${id}`);
  }

  updateProduct(id:string, updateProduct:UpdateProduct):Observable<Product>{
    return this.http.put<Product>(`${environment.apiBaseUrl}/api/product/${id}`,updateProduct);
  }

  deleteProduct(id:string):Observable<Product>{
    return this.http.delete<Product>(`${environment.apiBaseUrl}/api/product/${id}`);
  }
}
