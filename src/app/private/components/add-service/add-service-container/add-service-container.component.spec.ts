import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceContainerComponent } from './add-service-container.component';

describe('AddServiceContainerComponent', () => {
  let component: AddServiceContainerComponent;
  let fixture: ComponentFixture<AddServiceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddServiceContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
