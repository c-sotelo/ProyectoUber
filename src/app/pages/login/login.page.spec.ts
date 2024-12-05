import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', ['login']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    } as any));

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
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

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors?.['required']).toBeTruthy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.errors?.['required']).toBeTruthy();

    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });
});
