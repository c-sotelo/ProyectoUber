import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarviajePage } from './iniciarviaje.page';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('IniciarviajePage', () => {
  let component: IniciarviajePage;
  let fixture: ComponentFixture<IniciarviajePage>;
  let viajeServiceSpy: jasmine.SpyObj<ViajeService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    viajeServiceSpy = jasmine.createSpyObj('ViajeService', ['agregarViaje']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    viajeServiceSpy.agregarViaje.and.callFake(() => of(undefined));

    await TestBed.configureTestingModule({
      declarations: [IniciarviajePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ViajeService, useValue: viajeServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: NavController,
          useValue: {
            navigateForward: () => Promise.resolve(),
            navigateRoot: () => Promise.resolve(),
            _router: { events: of(null) }
          }
        },
        provideRouter([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarviajePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call viajeService when starting trip', (done) => {
    component.nuevoViaje = {
      vehiculo: 'Toyota',
      origen: 'Origen Test',
      destino: 'Destino Test',
      cantidadPasajeros: 0,
      fecha: new Date().toLocaleDateString(),
      horaInicio: '',
      idUsuario: 'test'
    };
    
    component.iniciarViaje();
    
    setTimeout(() => {
      expect(viajeServiceSpy.agregarViaje).toHaveBeenCalledWith(component.nuevoViaje);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/viaje']);
      done();
    }, 2000);
  });
});
