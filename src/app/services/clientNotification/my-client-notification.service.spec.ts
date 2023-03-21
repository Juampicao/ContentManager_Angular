import { TestBed } from '@angular/core/testing';

import { MyClientNotificationService } from './my-client-notification.service';

describe('MyClientNotificationService', () => {
  let service: MyClientNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyClientNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
