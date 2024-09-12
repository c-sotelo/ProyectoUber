import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarviajePage } from './iniciarviaje.page';

describe('IniciarviajePage', () => {
  let component: IniciarviajePage;
  let fixture: ComponentFixture<IniciarviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
