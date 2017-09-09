import { TestBed, inject } from '@angular/core/testing';

import { UploadimgService } from './uploadimg.service';

describe('UploadimgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadimgService]
    });
  });

  it('should be created', inject([UploadimgService], (service: UploadimgService) => {
    expect(service).toBeTruthy();
  }));
});
