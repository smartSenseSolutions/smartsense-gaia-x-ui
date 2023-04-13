import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepTwoComponent } from './signup-step-two.component';

describe('SignupStepTwoComponent', () => {
  let component: SignupStepTwoComponent;
  let fixture: ComponentFixture<SignupStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupStepTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
