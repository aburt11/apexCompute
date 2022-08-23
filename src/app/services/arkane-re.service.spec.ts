import { TestBed } from '@angular/core/testing';

import { ArkaneREService } from './arkane-re.service';

describe('ArkaneREService', () => {
  let service: ArkaneREService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArkaneREService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
