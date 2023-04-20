import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCredentialDialogComponent } from './verify-credential-dialog.component';

describe('VerifyCredentialDialogComponent', () => {
  let component: VerifyCredentialDialogComponent;
  let fixture: ComponentFixture<VerifyCredentialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VerifyCredentialDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCredentialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
