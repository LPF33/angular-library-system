import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfBoardComponent } from './shelf-board.component';

describe('ShelfBoardComponent', () => {
  let component: ShelfBoardComponent;
  let fixture: ComponentFixture<ShelfBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelfBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
