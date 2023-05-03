import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseLoginComponent } from './enterprise-login.component';

describe('EnterpriseLoginComponent', () => {
  let component: EnterpriseLoginComponent;
  let fixture: ComponentFixture<EnterpriseLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
