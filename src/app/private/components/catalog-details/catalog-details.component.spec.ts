import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogDetailsComponent } from './catalog-details.component';

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
