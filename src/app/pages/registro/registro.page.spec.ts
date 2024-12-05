import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', ['registro']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    } as any));

    TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registroForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.registroForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors?.['required']).toBeTruthy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('password fields should match', () => {
    const password = component.registroForm.controls['password'];
    const confirmPassword = component.registroForm.controls['confirmPassword'];

    password.setValue('123456');
    confirmPassword.setValue('123456');
    expect(password.value).toEqual(confirmPassword.value);
  });
});
