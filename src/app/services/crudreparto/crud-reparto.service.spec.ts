import { TestBed } from '@angular/core/testing';

import { CrudRepartoService } from './crud-reparto.service';

describe('CrudRepartoService', () => {
  let service: CrudRepartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudRepartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
