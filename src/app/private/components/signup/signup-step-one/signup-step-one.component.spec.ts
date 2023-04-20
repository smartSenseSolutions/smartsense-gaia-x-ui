import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepOneComponent } from './signup-step-one.component';

describe('SignupStepOneComponent', () => {
  let component: SignupStepOneComponent;
  let fixture: ComponentFixture<SignupStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupStepOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
