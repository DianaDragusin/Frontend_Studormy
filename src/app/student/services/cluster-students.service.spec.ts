import { TestBed } from '@angular/core/testing';

import { ClusterStudentsService } from './cluster-students.service';

describe('ClusterStudentsService', () => {
  let service: ClusterStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClusterStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
