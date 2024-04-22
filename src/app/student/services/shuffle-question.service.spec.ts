import { TestBed } from '@angular/core/testing';

import { ShuffleQuestionService } from './shuffle-question.service';

describe('ShuffleQuestionService', () => {
  let service: ShuffleQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuffleQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
