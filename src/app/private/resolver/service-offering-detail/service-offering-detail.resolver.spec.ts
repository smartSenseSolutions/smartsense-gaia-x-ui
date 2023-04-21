import { TestBed } from '@angular/core/testing';

import { ServiceOfferingDetailResolver } from './service-offering-detail.resolver';

describe('ServiceOfferingDetailResolver', () => {
  let resolver: ServiceOfferingDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ServiceOfferingDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
