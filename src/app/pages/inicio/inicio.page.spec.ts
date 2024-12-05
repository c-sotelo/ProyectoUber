import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;

  beforeEach(async () => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['obtenerStorage']);
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['obtenerUsuario']);

    storageServiceSpy.obtenerStorage.and.returnValue(Promise.resolve({
      correo: 'test@test.com',
      token: 'test-token'
    }));

    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: UsuarioService, useValue: usuarioServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ correo: 'test@test.com' })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    component.usuario = { correo: 'test@test.com', nombre: 'Test User' };
    fixture.detectChanges();
  });

  it('should initialize with user data', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(storageServiceSpy.obtenerStorage).toHaveBeenCalled();
  }));
});





