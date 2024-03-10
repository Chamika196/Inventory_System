import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategory } from '../model/add-category.model';
import { environment } from '../../../../environments/environment';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';
import { UpdateCategory } from '../model/update-category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient ) {}

  createCategory(data: AddCategory):Observable<Category>{
    return this.http.post<Category>(`${environment.apiBaseUrl}/api/Category`,data);
  }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Category`);
  }

  getCategoryById(categoryId:string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Category/${categoryId}`);
  }

  updateCategory(id:string, updateCategory:UpdateCategory):Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Category/${id}`,updateCategory);
  }

  deleteCategory(id:string):Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Category/${id}`);
  }
}
