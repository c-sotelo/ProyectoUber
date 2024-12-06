import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { InicioPage } from './inicio.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { BASE_URL } from '../config/config';
import { environment } from '../../environments/environment';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          const params = {
            correo: 'test@example.com',
            // Añade aquí otros parámetros que tu componente espera
          };
          return params[key];
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: BASE_URL, useValue: environment.baseUrl || 'http://test-url.com' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data', () => {
    expect(component).toBeTruthy();
    // Aquí puedes añadir más expectativas específicas
  });
});





