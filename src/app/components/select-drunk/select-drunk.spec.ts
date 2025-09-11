import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDrunk } from './select-drunk';

describe('SelectDrunk', () => {
  let component: SelectDrunk;
  let fixture: ComponentFixture<SelectDrunk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDrunk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDrunk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
