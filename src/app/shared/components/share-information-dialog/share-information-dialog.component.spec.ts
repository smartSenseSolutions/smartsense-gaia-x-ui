import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareInformationDialogComponent } from './share-information-dialog.component';

describe('ShareInformationDialogComponent', () => {
  let component: ShareInformationDialogComponent;
  let fixture: ComponentFixture<ShareInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareInformationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
