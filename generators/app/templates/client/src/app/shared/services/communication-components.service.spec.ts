import { TestBed } from '@angular/core/testing';

import { CommunicationComponentsService } from './communication-components.service';

describe('CommunicationComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunicationComponentsService = TestBed.get(CommunicationComponentsService);
    expect(service).toBeTruthy();
  });
});
