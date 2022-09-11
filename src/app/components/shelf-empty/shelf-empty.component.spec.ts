import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfEmptyComponent } from './shelf-empty.component';

describe('ShelfEmptyComponent', () => {
  let component: ShelfEmptyComponent;
  let fixture: ComponentFixture<ShelfEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelfEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
