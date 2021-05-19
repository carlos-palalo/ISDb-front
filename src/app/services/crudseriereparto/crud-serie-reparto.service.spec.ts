import { TestBed } from '@angular/core/testing';

import { CrudSerieRepartoService } from './crud-serie-reparto.service';

describe('CrudSerieRepartoService', () => {
  let service: CrudSerieRepartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSerieRepartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
