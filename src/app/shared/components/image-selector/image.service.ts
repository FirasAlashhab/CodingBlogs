import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    title: '',
    url: '',
    fileName: '',
  });

  constructor(private http: HttpClient) {}

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<BlogImage>(
      `${environment.baseApiUrl}/api/images`,
      formData
    );
  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.baseApiUrl}/api/images`);
  }

  selectImage(image: BlogImage) {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
