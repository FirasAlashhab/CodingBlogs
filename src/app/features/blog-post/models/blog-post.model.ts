import { Category } from '../../category/models/category.model';

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHnadle: string;
  publishedDate: Date;
  author: string;
  isVisible: true;
  categories: Category[];
}
