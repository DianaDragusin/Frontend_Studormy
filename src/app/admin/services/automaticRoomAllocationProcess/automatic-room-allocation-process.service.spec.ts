import { TestBed } from '@angular/core/testing';

import { AutomaticRoomAllocationProcessService } from './automatic-room-allocation-process.service';

describe('AutomaticRoomAllocationProcessService', () => {
  let service: AutomaticRoomAllocationProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomaticRoomAllocationProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
