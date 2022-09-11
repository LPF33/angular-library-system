import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBookViewComponent } from './find-book-view.component';

describe('FindBookViewComponent', () => {
  let component: FindBookViewComponent;
  let fixture: ComponentFixture<FindBookViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindBookViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
