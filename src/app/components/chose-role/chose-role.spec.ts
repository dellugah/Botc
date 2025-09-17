import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseRole } from './chose-role';

describe('ChoseRole', () => {
  let component: ChoseRole;
  let fixture: ComponentFixture<ChoseRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoseRole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoseRole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
