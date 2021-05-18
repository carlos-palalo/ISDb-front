import { TestBed } from '@angular/core/testing';

import { CrudSerieGeneroService } from './crud-serie-genero.service';

describe('CrudSerieGeneroService', () => {
  let service: CrudSerieGeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSerieGeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
