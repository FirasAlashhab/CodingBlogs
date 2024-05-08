import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AddBlogPost } from '../models/add-blog-post.model';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(
      `${environment.baseApiUrl}/api/blogposts?addAuth=true`,
      data
    );
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.baseApiUrl}/api/blogposts`);
  }

  getById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `${environment.baseApiUrl}/api/blogposts/${id}`
    );
  }

  updateBlogPostById(id: string, data: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(
      `${environment.baseApiUrl}/api/blogposts/${id}?addAuth=true`,
      data
    );
  }

  deleteBlogPostById(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(
      `${environment.baseApiUrl}/api/blogposts/${id}?addAuth=true`
    );
  }

  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `${environment.baseApiUrl}/api/blogposts/${url}`
    );
  }
}
