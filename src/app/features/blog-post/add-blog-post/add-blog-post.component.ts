import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css',
})
export class AddBlogPostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  createBlogPostSubscription!: Subscription;
  imageSelectorSubscription!: Subscription;
  categories$!: Observable<Category[]>;
  isImageOpen: boolean = false;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      urlHnadle: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: [],
    };
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectorSubscription = this.imageService
      .onSelectImage()
      .subscribe({
        next: (res) => {
          if (this.model) {
            this.model.featuredImageUrl = res.url;
            this.isImageOpen = false;
          }
        },
      });
  }

  onSubmit() {
    this.createBlogPostSubscription = this.blogPostService
      .createBlogPost(this.model)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/admin/blogposts']);
        },
      });
  }

  openImageSelector() {
    this.isImageOpen = true;
  }

  closeImageSelector() {
    this.isImageOpen = false;
  }

  ngOnDestroy(): void {
    if (this.createBlogPostSubscription) {
      this.createBlogPostSubscription.unsubscribe();
    }
    this.imageSelectorSubscription?.unsubscribe();
  }
}
