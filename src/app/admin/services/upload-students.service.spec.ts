import { TestBed } from '@angular/core/testing';

import { UploadStudentsService } from './upload-students.service';

describe('UploadStudentsService', () => {
  let service: UploadStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
