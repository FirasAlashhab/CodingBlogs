import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { updateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(public http: HttpClient, private cookieService: CookieService) {}

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.baseApiUrl}/api/categories?addAuth=true`,
      model
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.baseApiUrl}/api/categories`
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${environment.baseApiUrl}/api/categories/${id}`
    );
  }

  updateCategory(
    id: string,
    model: updateCategoryRequest
  ): Observable<Category> {
    return this.http.put<Category>(
      `${environment.baseApiUrl}/api/categories/${id}?addAuth=true`,
      model
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      `${environment.baseApiUrl}/api/categories/${id}?addAuth=true`
    );
  }
}
