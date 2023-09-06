import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelLevelComponent } from './label-level.component';

describe('LabelLevelComponent', () => {
  let component: LabelLevelComponent;
  let fixture: ComponentFixture<LabelLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
