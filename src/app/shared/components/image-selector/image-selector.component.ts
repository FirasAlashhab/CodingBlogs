import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css',
})
export class ImageSelectorComponent implements OnDestroy, OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$!: Observable<BlogImage[]>;
  uploadImageSubscription!: Subscription;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage() {
    if (this.file && this.fileName !== '' && this.title !== '') {
      this.uploadImageSubscription = this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (res) => {
            this.getImages();
            this.imageUploadForm?.resetForm();
          },
        });
    }
  }

  selectImage(image: BlogImage) {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }

  ngOnDestroy(): void {
    this.uploadImageSubscription?.unsubscribe();
  }
}
