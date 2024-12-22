import { TestBed } from '@angular/core/testing';

import { LoginFirebaseService } from './login-firebase.service';

describe('LoginFirebaseService', () => {
  let service: LoginFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
