import { TestBed } from '@angular/core/testing';

import { SerieRepartoService } from './serie-reparto.service';

describe('SerieRepartoService', () => {
  let service: SerieRepartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieRepartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
