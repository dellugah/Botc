import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatherPlayers } from './gather-players';

describe('GatherPlayers', () => {
  let component: GatherPlayers;
  let fixture: ComponentFixture<GatherPlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatherPlayers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatherPlayers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
