import { TestBed } from '@angular/core/testing';

import { CrudRepartoRoleService } from './crud-reparto-role.service';

describe('CrudRepartoRoleService', () => {
  let service: CrudRepartoRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudRepartoRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
