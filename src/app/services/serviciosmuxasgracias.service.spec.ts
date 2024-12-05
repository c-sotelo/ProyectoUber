import { TestBed } from '@angular/core/testing';
import { ServiciosmuxasgraciasService } from './serviciosmuxasgracias.service';
import { HttpClientModule } from '@angular/common/http';

describe('ServiciosmuxasgraciasService', () => {
  let service: ServiciosmuxasgraciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ServiciosmuxasgraciasService,
        { provide: 'BASE_URL', useValue: 'http://localhost:3000' }
      ]
    });
    
    service = TestBed.inject(ServiciosmuxasgraciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 