import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTag } from './player-tag';

describe('PlayerTag', () => {
  let component: PlayerTag;
  let fixture: ComponentFixture<PlayerTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
