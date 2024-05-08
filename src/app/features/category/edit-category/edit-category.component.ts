import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { updateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  idSubscription!: Subscription;
  editCategorySubscription!: Subscription;
  deleteCategorySubscription!: Subscription;
  category: Category = {
    id: '',
    name: '',
    urlHandle: '',
  };

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });

    if (this.id) {
      this.categoryService.getCategoryById(this.id).subscribe({
        next: (res) => {
          this.category = res;
        },
      });
    }
  }

  onSubmit() {
    const updateCategoryRequest: updateCategoryRequest = {
      name: this.category?.name,
      urlHandle: this.category?.urlHandle,
    };
    if (this.id) {
      this.editCategorySubscription = this.categoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/admin/categories']);
          },
        });
    }
  }

  onDelete() {
    if (this.id) {
      this.deleteCategorySubscription = this.categoryService
        .deleteCategory(this.id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/admin/categories']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }

    if (this.editCategorySubscription) {
      this.editCategorySubscription.unsubscribe();
    }

    if (this.deleteCategorySubscription) {
      this.deleteCategorySubscription.unsubscribe();
    }
  }
}
