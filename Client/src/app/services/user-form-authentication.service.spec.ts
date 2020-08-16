import { TestBed } from '@angular/core/testing';

import { UserFormAuthenticationService } from './user-form-authentication.service';

describe('UserFormAuthenticationService', () => {
  let service: UserFormAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormAuthenticationService);
  });

  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
