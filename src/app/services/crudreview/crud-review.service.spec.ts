import { TestBed } from '@angular/core/testing';

import { CrudReviewService } from './crud-review.service';

describe('CrudReviewService', () => {
  let service: CrudReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
