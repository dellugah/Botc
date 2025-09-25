import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBoard } from './comment-board';

describe('CommentBoard', () => {
  let component: CommentBoard;
  let fixture: ComponentFixture<CommentBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
