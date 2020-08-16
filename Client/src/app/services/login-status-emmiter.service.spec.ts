import { TestBed } from '@angular/core/testing';

import { LoginStatusEmmiterService } from './login-status-emmiter.service';

describe('LoginStatusEmmiterService', () => {
  let service: LoginStatusEmmiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStatusEmmiterService);
  });

  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
