import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGridComponent } from './board-grid.component';

describe('BoardGridComponent', () => {
  let component: BoardGridComponent;
  let fixture: ComponentFixture<BoardGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
