import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceOfferingsComponent } from './my-service-offerings.component';

describe('MyServiceOfferingsComponent', () => {
  let component: MyServiceOfferingsComponent;
  let fixture: ComponentFixture<MyServiceOfferingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyServiceOfferingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServiceOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
