import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCredentialsComponent } from './issue-credentials.component';

describe('IssueCredentialsComponent', () => {
  let component: IssueCredentialsComponent;
  let fixture: ComponentFixture<IssueCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IssueCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
