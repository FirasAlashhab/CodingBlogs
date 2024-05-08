import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$!: Observable<BlogPost>;

  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
      },
    });

    this.getBlogByUrl();
  }

  getBlogByUrl() {
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrl(this.url);
    }
  }
}
