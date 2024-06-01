import {TestBed} from '@angular/core/testing';

import {QuestionnaireStateService} from './questionnaire-state.service';

describe('QuestionnaireStateService', () => {
  let service: QuestionnaireStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
