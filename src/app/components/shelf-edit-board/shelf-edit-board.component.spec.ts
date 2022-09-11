import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfEditBoardComponent } from './shelf-edit-board.component';

describe('ShelfEditBoardComponent', () => {
  let component: ShelfEditBoardComponent;
  let fixture: ComponentFixture<ShelfEditBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfEditBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelfEditBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
