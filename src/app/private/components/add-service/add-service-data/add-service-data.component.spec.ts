import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceDataComponent } from './add-service-data.component';

describe('AddServiceDataComponent', () => {
  let component: AddServiceDataComponent;
  let fixture: ComponentFixture<AddServiceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddServiceDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
