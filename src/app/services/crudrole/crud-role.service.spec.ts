import { TestBed } from '@angular/core/testing';

import { CrudRoleService } from './crud-role.service';

describe('CrudRoleService', () => {
  let service: CrudRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
