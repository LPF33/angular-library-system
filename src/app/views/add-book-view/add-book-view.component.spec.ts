import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookViewComponent } from './add-book-view.component';

describe('AddBookViewComponent', () => {
  let component: AddBookViewComponent;
  let fixture: ComponentFixture<AddBookViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
