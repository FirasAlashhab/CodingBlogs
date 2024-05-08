export interface AddBlogPost {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHnadle: string;
  publishedDate: Date;
  author: string;
  isVisible: true;
  categories: string[];
}
