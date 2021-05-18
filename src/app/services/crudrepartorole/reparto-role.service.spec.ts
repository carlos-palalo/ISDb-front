import { TestBed } from '@angular/core/testing';

import { RepartoRoleService } from './reparto-role.service';

describe('RepartoRoleService', () => {
  let service: RepartoRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepartoRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
