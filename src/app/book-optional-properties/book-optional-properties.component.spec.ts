import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOptionalPropertiesComponent } from './book-optional-properties.component';

describe('BookOptionalPropertiesComponent', () => {
  let component: BookOptionalPropertiesComponent;
  let fixture: ComponentFixture<BookOptionalPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookOptionalPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOptionalPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
