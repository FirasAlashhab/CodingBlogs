import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrl: './edit-blog-post.component.css',
})
export class EditBlogPostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$!: Observable<Category[]>;
  selectedCategories!: string[];
  deleteBlogPostSub!: Subscription;
  imageSelectSub!: Subscription;

  isImageOpen: boolean = false;
  getBlogPostSub!: Subscription;
  updateBlogPostSub!: Subscription;
  routeSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.getBlogPostSub = this.blogPostService
            .getById(this.id)
            .subscribe({
              next: (res) => {
                this.model = res;
                this.selectedCategories = res.categories.map((x) => x.id);
              },
            });
        }
        this.imageSelectSub = this.imageService.onSelectImage().subscribe({
          next: (res) => {
            if (this.model) {
              this.model.featuredImageUrl = res.url;
              this.isImageOpen = false;
            }
          },
        });
      },
    });
  }

  onSubmit() {
    if (this.id && this.model) {
      let updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHnadle: this.model.urlHnadle,
        isVisible: this.model.isVisible,
        shortDescription: this.model.shortDescription,
        categories: this.selectedCategories ?? [],
      };
      this.updateBlogPostSub = this.blogPostService
        .updateBlogPostById(this.id, updateBlogPost)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/admin/blogposts']);
          },
        });
    }
  }

  DeleteBlogPost() {
    if (this.id) {
      this.deleteBlogPostSub = this.blogPostService
        .deleteBlogPostById(this.id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/admin/blogposts']);
          },
        });
    }
  }

  openImageSelector() {
    this.isImageOpen = true;
  }

  closeImageSelector() {
    this.isImageOpen = false;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.updateBlogPostSub) {
      this.updateBlogPostSub.unsubscribe();
    }

    if (this.getBlogPostSub) {
      this.getBlogPostSub.unsubscribe();
    }
    this.deleteBlogPostSub?.unsubscribe();
    this.imageSelectSub?.unsubscribe();
  }
}
