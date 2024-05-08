import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css',
})
export class BlogPostListComponent implements OnInit {
  blogPosts$!: Observable<BlogPost[]>;
  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }
}
