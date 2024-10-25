import { TestBed } from '@angular/core/testing';

import { ServiciosmuxasgraciasService } from './serviciosmuxasgracias.service';

describe('ServiciosmuxasgraciasService', () => {
  let service: ServiciosmuxasgraciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosmuxasgraciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
