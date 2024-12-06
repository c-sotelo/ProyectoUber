import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiciosmuxasgraciasService } from './serviciosmuxasgracias.service';
import { BASE_URL } from '../config/config';
import { environment } from '../../environments/environment';

describe('ServiciosmuxasgraciasService', () => {
  let service: ServiciosmuxasgraciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServiciosmuxasgraciasService,
        { provide: BASE_URL, useValue: environment.baseUrl || 'http://test-url.com' }
      ]
    });
    service = TestBed.inject(ServiciosmuxasgraciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 