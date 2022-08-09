import { TestBed } from '@angular/core/testing';

import { SearchTermsService } from './search-terms.service';

describe('SearchTermsService', () => {
  let service: SearchTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
