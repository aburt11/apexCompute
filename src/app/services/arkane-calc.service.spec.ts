import { TestBed } from '@angular/core/testing';

import { ArkaneCalcService } from './arkane-calc.service';

describe('ArkaneCalcService', () => {
  let service: ArkaneCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArkaneCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
