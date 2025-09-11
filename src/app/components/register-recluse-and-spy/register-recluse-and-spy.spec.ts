import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRecluseAndSpy } from './register-recluse-and-spy';

describe('RegisterRecluseAndSpy', () => {
  let component: RegisterRecluseAndSpy;
  let fixture: ComponentFixture<RegisterRecluseAndSpy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRecluseAndSpy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRecluseAndSpy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
