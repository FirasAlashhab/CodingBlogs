import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  private subscription!: Subscription;
  constructor(public categoryService: CategoryService, private router: Router) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  onSubmit() {
    this.subscription = this.categoryService.addCategory(this.model).subscribe({
      next: (res) => {
        this.router.navigate(['/admin/categories']);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
