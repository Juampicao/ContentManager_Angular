import { TestBed } from '@angular/core/testing';
import { ServiceInjector } from './ServiceInjector';


describe('GetServiceService', () => {
  let service: ServiceInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceInjector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
