import { TestBed } from '@angular/core/testing';

import { CrudSerieService } from './crud-serie.service';

describe('CrudSerieService', () => {
  let service: CrudSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
