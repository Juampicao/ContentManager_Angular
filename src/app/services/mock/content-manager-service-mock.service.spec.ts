import { TestBed } from '@angular/core/testing';

import { ContentManagerServiceMockService } from './content-manager-service-mock.service';

describe('ContentManagerServiceMockService', () => {
  let service: ContentManagerServiceMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentManagerServiceMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
