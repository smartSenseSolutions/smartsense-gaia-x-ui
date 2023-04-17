import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCatalogueComponent } from './browse-catalogue.component';

describe('BrowseCatalogueComponent', () => {
  let component: BrowseCatalogueComponent;
  let fixture: ComponentFixture<BrowseCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
