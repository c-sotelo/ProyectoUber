import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user', async () => {
    const mockUser = {
      p_nombre: 'Test User',
      p_correo_electronico: 'test@test.com',
      p_telefono: '123456789',
      token: 'test-token'
    };

    const mockFile = {
      file: new File([''], 'test.jpg', { type: 'image/jpeg' }),
      name: 'test.jpg'
    };

    const mockResponse = { success: true };

    service.agregarUsuario(mockUser, mockFile).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user/agregar`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get user', async () => {
    const mockData = {
      p_correo: 'test@test.com',
      token: 'test-token'
    };

    const mockResponse = {
      nombre: 'Test User',
      correo: 'test@test.com'
    };

    service.obtenerUsuario(mockData).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}user/obtener?p_correo=${mockData.p_correo}&token=${mockData.token}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
