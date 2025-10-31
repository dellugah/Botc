import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityPage } from './ability-page';

describe('AbilityPage', () => {
  let component: AbilityPage;
  let fixture: ComponentFixture<AbilityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
