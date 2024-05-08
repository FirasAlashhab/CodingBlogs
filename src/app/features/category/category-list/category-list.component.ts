import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoryList$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getAllCategories();
  }
}
