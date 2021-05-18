import { TestBed } from '@angular/core/testing';

import { CrudGeneroService } from './crud-genero.service';

describe('CrudGeneroService', () => {
  let service: CrudGeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudGeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
