import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogPostComponent } from './edit-blog-post.component';

describe('EditBlogPostComponent', () => {
  let component: EditBlogPostComponent;
  let fixture: ComponentFixture<EditBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBlogPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
