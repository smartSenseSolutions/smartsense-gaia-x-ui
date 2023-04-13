import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartXComponent } from './smart-x.component';

describe('SmartXComponent', () => {
  let component: SmartXComponent;
  let fixture: ComponentFixture<SmartXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SmartXComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
