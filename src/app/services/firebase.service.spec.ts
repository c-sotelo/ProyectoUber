import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
      'createUserWithEmailAndPassword',
      'signOut',
      'sendPasswordResetEmail'
    ]);
    
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: AngularFireAuth, useValue: spy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    
    service = TestBed.inject(FirebaseService);
    angularFireAuthSpy = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', async () => {
    const mockResponse = { user: { email: 'test@test.com' } };
    angularFireAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.resolve(mockResponse as any));

    const result = await service.login('test@test.com', '123456');
    expect(result).toBeTruthy();
    expect(angularFireAuthSpy.signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should register successfully', async () => {
    const mockResponse = { user: { email: 'test@test.com' } };
    angularFireAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(mockResponse as any));

    const result = await service.registro('test@test.com', '123456');
    expect(result).toBeTruthy();
    expect(angularFireAuthSpy.createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should logout successfully', async () => {
    angularFireAuthSpy.signOut.and.returnValue(Promise.resolve());
    
    await service.logout();
    expect(angularFireAuthSpy.signOut).toHaveBeenCalled();
  });
});
